'use server';

import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prismadb';
import { SafeUser } from '@/lib/types';
import { authOptions } from '@/lib/constants';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
  // try {
  // console.log('in getCurrentUser');
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  if (!currentUser) {
    return null;
  }

  return {
    ...currentUser,
    createdAt: currentUser.createdAt.toISOString(),
    updatedAt: currentUser.updatedAt.toISOString(),
    emailVerified: currentUser.emailVerified?.toISOString() || null
  };
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }
}
