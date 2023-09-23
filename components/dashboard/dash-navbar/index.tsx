'use client';

import { HOME_DOMAIN } from '@/lib/constants';
import { SafeUser } from '@/lib/types';
import { signOut } from 'next-auth/react';

interface DashNavbarProps {
  user: SafeUser;
}

export default function DashNavbar({
  user
}: DashNavbarProps) {
  return (
    <div className="flex h-[64px] w-full justify-end bg-gray-50 px-3 py-4">
      <ul>
        <li className="">
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
                  onClick={() =>
                    signOut({ callbackUrl: HOME_DOMAIN })
                  }>
                  Log out
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
