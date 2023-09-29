import { SafeProvider } from '../types';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import prisma from '@/lib/prismadb';
import Google from 'next-auth/providers/google';

export const HOME_HOSTNAMES = new Set([
  'datadrops.io',
  'ldatadrops.io:3000',
  'localhost:3000'
]);

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain);
};

export const APP_HOSTNAMES = new Set([
  'app.datadrops.io',
  'app.localhost:3000',
  'app.ldatadrops.io:3000'
]);

export const APP_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'https://app.datadrops.io'
    : 'http://app.ldatadrops.io:3000';

export const HOME_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'https://datadrops.io'
    : 'http://ldatadrops.io:3000';

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

export const PROVIDERS: SafeProvider[] = [
  {
    id: 'google',
    name: 'Google'
  }
];

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_AUTH_SECRET || ''
    })
  ],
  pages: {
    signIn: '/app/sign-in'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     console.log('callback');
  //     console.log(url, baseUrl);
  //     // // Allows relative callback URLs
  //     // if (new URL(url).hostname === hostName) {
  //     //   console.log(
  //     //     'callback2',
  //     //     new URL(url).hostname,
  //     //     hostName
  //     //   );
  //     //   return Promise.resolve(url);
  //     // }

  //     // return Promise.resolve(new URL(url));

  //     return url;
  //   }
  // },
  // cookies: {
  //   sessionToken: {
  //     name: `${
  //       useSecureCookies ? '__Secure-' : ''
  //     }next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       domain:
  //         hostName == 'ldatadrops.io'
  //           ? 'ldatadrops.io:3000'
  //           : '.ldatadrops.io:3000',
  //       secure: useSecureCookies
  //     }
  //   }
  // },
  secret: process.env.NEXTAUTH_SECRET as string
};
