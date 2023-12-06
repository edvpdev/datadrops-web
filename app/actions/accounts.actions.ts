'use server';

import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';
import { SafeAccount, SafeUser } from '@/lib/types';

export async function getUserAccounts(
  user: SafeUser | null = null
): Promise<SafeAccount[]> {
  try {
    if (!user) {
      user = await getCurrentUser();

      if (!user?.id) {
        return [];
      }
    }

    const userAccounts = await prisma.account.findMany({
      where: {
        userId: user.id
      }
    });

    if (!userAccounts.length) {
      return [];
    }

    return userAccounts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
