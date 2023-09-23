import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prismadb';
import Google from 'next-auth/providers/google';

// const useSecureCookies =
//   process.env.NODE_ENV === 'production';
// const hostName = new URL(
//   process.env.NEXT_PUBLIC_ROOT_DOMAIN!
// ).hostname;

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
