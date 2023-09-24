import { User } from '@prisma/client';
import { IconType } from 'react-icons/lib';

export type SafeUser = Omit<
  User,
  'createdAt' | 'emailVerified' | 'updatedAt'
> & {
  createdAt: string;
  emailVerified: string | null;
  updatedAt: string;
};

export type SafeProvider = {
  name: string;
  id: string;
};
