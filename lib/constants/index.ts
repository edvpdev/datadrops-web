import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions, DefaultSession, TokenSet } from 'next-auth';
import prisma from '@/lib/prismadb';
import Google from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { IProvider } from '../types';
import { customLog } from '@/actions/customLog.action';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    error?: 'RefreshAccessTokenError';
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      status?: string;
    };
  }

  interface User {
    status?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: 'RefreshAccessTokenError';
    providerAccountId: string;
    status: string;
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
    CredentialsProvider({
      id: 'credentials',
      name: 'Domain Account',
      async authorize(credentials, req) {
        console.log('Credentials');

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: 'demo1@example.com'
            }
          });
          console.log(user);

          if (user === null) {
            console.log('here');
            throw new Error('No user found');
          }

          return {
            ...user,
            status: 'demo'
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
      credentials: {
        // username: {
        //   label: 'Username',
        //   type: 'text ',
        //   placeholder: 'user@demo.com'
        // }
        // password: { label: "Password", type: "password" },
      }
    }),
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
      },
      profile(profile) {
        return {
          // Return the default fields
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          status: 'standard'
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(account);
      console.log(user);
      console.log(profile);
      if (account?.provider === 'google') {
        customLog.info('User Sign up', {
          type: 'client',
          subtype: 'conversion',
          data: {
            user
          }
        });
      }

      await customLog.flush();
      // console.log('User first-time sign in', {
      //   accountId: account?.id,
      //   userId: user?.id,
      //   email: email
      // });
      // await customLog.flush();
      return true;
    },
    // @ts-ignore
    async jwt({ token, user, account }) {
      //  check if user is a demo user, set session expiration for week
      if (user && account && account.provider === 'credentials') {
        return {
          ...token,
          // access_token: account.access_token,
          expires_at: new Date().getTime() + 1000 * 60 * 60 * 24,
          // refresh_token: '',
          // providerAccountId: account.providerAccountId,
          status: (user as any).status || 'standard'
        };
      }
      if (user && account && account.provider === 'google') {
        // console.log('User First time Sign In');
        customLog.info('User Sign In', {
          type: 'client',
          subtype: 'conversion',
          data: {
            user
          }
        });
        await customLog.flush();
        // console.log(account);
        // console.log(user);

        const [google] = await prisma.account.findMany({
          where: {
            providerAccountId: token.providerAccountId,
            provider: 'google'
          }
        });

        await prisma.account.update({
          data: {
            access_token: account.access_token,
            expires_at: account.expires_at! * 1000,
            refresh_token: account.refresh_token ?? google.refresh_token
          },
          where: {
            provider_providerAccountId: {
              provider: 'google',
              providerAccountId: google.providerAccountId
            }
          }
        });

        // Save the access token and refresh token in the JWT on the initial login
        // console.log('Saving access token and refresh token in JWT');
        // console.log({
        //   access_token: account.access_token,
        //   expires_at: account.expires_at! * 1000,
        //   refresh_token: account.refresh_token ?? google.refresh_token,
        //   providerAccountId: account.providerAccountId
        // });
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at! * 1000,
          refresh_token: account.refresh_token ?? google.refresh_token,
          providerAccountId: account.providerAccountId,
          status: (user as any).status || 'standard'
        };
      }

      if (Date.now() < token.expires_at) {
        return token;
      } else {
        if (token.eroor === 'RefreshAccessTokenError') {
        }
        console.log(token);
        if (token.provider === 'credentials') {
          console.log(token);
          return token;
        }
        // console.log('Refreshing token for user');
        // console.log(token);
        customLog.debug('Refreshing token for user', {
          token: {
            expires_at: token.expires_at,
            refresh_token: token.refresh_token
          },
          userId: token.sub // sub is the user id
        });
        // console.log(account);
        await customLog.flush();
        // If the access token has expired, try to refresh it
        try {
          if (!token.refresh_token) throw new Error('No refresh token');
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
              expires_at: Date.now() + 1000 * (tokens.expires_in as number),
              refresh_token: tokens.refresh_token ?? google.refresh_token
            },
            where: {
              provider_providerAccountId: {
                provider: 'google',
                providerAccountId: google.providerAccountId
              }
            }
          });

          // console.log('Returning refreshed token');
          // console.log({
          //   access_token: tokens.access_token,
          //   expires_at: Date.now() + 1000 * (tokens.expires_in as number),
          //   providerAccountId: token.providerAccountId,
          //   refresh_token: tokens.refresh_token ?? token.refresh_token
          // });

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Date.now() + 1000 * (tokens.expires_in as number),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            providerAccountId: token.providerAccountId,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
            status: token.status || 'standard'
          };
        } catch (error) {
          customLog.error('Error refreshing token for user', {
            type: 'client',
            subtype: 'error',
            data: {
              userId: user?.id,
              error
            }
          });
          await customLog.flush();
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
    async session({ session, token, user }) {
      // console.log('Session', session);
      // console.log('Token', token);
      // console.log('User', user);
      if (token) {
        session.error = token.error;
        session.user = {
          ...session.user,
          status: token.status
        };
        // session.status = token.status;
      }

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
