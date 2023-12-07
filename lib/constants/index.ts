import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions, TokenSet } from 'next-auth';
import prisma from '@/lib/prismadb';
import Google from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { IProvider } from '../types';
import { customLog } from '@/actions/customLog.action';

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: 'RefreshAccessTokenError';
    providerAccountId: string;
  }
}

export const PRIVATE_PAGES = ['/app/dashboard'];

export const HOME_HOSTNAMES = new Set([
  'datadrops.io',
  'ldatadrops.io:3000',
  'localhost:3000',
  'ldatadrops.io'
]);

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain);
};

export const APP_HOSTNAMES = new Set([
  'app.datadrops.io',
  'app.localhost:3000',
  'app.ldatadrops.io:3000',
  'app.ldatadrops.io'
]);

export const APP_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'https://app.datadrops.io'
    : 'https://app.ldatadrops.io';

export const HOME_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'https://datadrops.io'
    : 'https://ldatadrops.io';

export const SHOW_BACKGROUND_SEGMENTS = new Set([
  'tools',
  'pricing',
  'help',
  'blog',
  '(blog-post)',
  'login',
  'register',
  'auth'
]);

export const PROVIDERS: Pick<IProvider, 'title' | '_id'>[] = [
  {
    _id: 'google',
    title: 'Google'
  }
];

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true
    }),
    Google({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_AUTH_SECRET || '',
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          access_type: 'offline',
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly'
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      customLog.info('User signed in', {
        accountId: account?.id,
        userId: user?.id,
        email: email
      });
      await customLog.flush();
      return true;
    },
    // @ts-ignore
    async jwt({ token, user, account }) {
      if (account) {
        customLog.info('Assigning first token for user', {
          token: {
            expires_at: token.expires_at,
            refresh_token: token.refresh_token,
            access_token: token.access_token
          },
          userId: user?.id
        });
        await customLog.flush();

        // Save the access token and refresh token in the JWT on the initial login
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at! * 1000,
          refresh_token: account.refresh_token,
          providerAccountId: account.providerAccountId
        };
      } else if (Date.now() < token.expires_at) {
        // console.log('here B');
        // If the access token has not expired yet, return it
        return token;
      } else {
        customLog.info('Refreshing token for user', {
          token: {
            expires_at: token.expires_at,
            refresh_token: token.refresh_token,
            access_token: token.access_token
          },
          userId: user?.id
        });
        await customLog.flush();
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch('https://oauth2.googleapis.com/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_AUTH_CLIENT_ID!,
              client_secret: process.env.GOOGLE_AUTH_SECRET!,
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token
            }),
            method: 'POST'
          });

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          const [google] = await prisma.account.findMany({
            where: {
              providerAccountId: token.providerAccountId,
              provider: 'google'
            }
          });

          await prisma.account.update({
            data: {
              access_token: tokens.access_token,
              expires_at: Math.floor(
                Date.now() / 1000 + (tokens.expires_in as number)
              ),
              refresh_token: tokens.refresh_token ?? google.refresh_token
            },
            where: {
              provider_providerAccountId: {
                provider: 'google',
                providerAccountId: google.providerAccountId
              }
            }
          });

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at:
              Math.floor(Date.now() / 1000 + (tokens.expires_in as number)) *
              1000,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            providerAccountId: token.providerAccountId,
            refresh_token: tokens.refresh_token ?? token.refresh_token
          };
        } catch (error) {
          customLog.error('Refreshing token for user', {
            userId: user?.id,
            error
          });
          await customLog.flush();
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
    async session({ session, token }) {
      session.expires = new Date(token.expires_at).toISOString();
      session.error = token.error;
      session.user = {
        ...session.user
        // id: token.providerAccountId
      };
      return session;
    }
  },
  pages: {
    signIn: '/app/sign-in'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET as string
};
