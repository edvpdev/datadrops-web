import { User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'emailVerified' | 'updatedAt'
> & {
  createdAt: string;
  emailVerified: string | null;
  updatedAt: string;
};
