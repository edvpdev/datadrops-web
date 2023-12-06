import { User, Account } from '@prisma/client';
export * from './provider.types';
export * from './synchronization.types';
export * from './entity.types';

// Accounts
export type SafeAccount = Account;

export type SafeUser = Omit<
  User,
  'createdAt' | 'emailVerified' | 'updatedAt'
> & {
  createdAt: string;
  emailVerified: string | null;
  updatedAt: string;
};
