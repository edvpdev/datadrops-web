import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prismadb';
import { SafeUser } from '@/lib/types';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    console.log('in getCurrentUser');
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    console.log('in getCurrentUser 2');
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    console.log('in getCurrentUser 4');
    if (!currentUser) {
      return null;
      3;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
