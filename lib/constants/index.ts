import { SafeProvider } from '../types';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import prisma from '@/lib/prismadb';
import Google from 'next-auth/providers/google';

export const PRIVATE_PAGES = ['/app/dashboard'];

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
    // With custom scopes
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   authorization: {
    //     params: {
    //       scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
    //     }
    //   }
  ],
  pages: {
    signIn: '/app/sign-in'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET as string
};
