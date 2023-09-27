'use client';

import { HOME_DOMAIN } from '@/lib/constants';
import { SafeUser } from '@/lib/types';
import { DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';

interface Props {
  user: DefaultSession['user'] | null;
}

export default function DashNavbarProfileDropdown({ user }: Props) {
  return (
    <div className="avatar placeholder dropdown dropdown-end">
      <div
        tabIndex={0}
        className="w-8 cursor-pointer rounded-full bg-neutral-focus text-neutral-content">
        <span>MX</span>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
        <li>
          <div
            className="btn"
            onClick={() => signOut({ callbackUrl: HOME_DOMAIN })}>
            Log out
          </div>
        </li>
      </ul>
    </div>
  );
}
