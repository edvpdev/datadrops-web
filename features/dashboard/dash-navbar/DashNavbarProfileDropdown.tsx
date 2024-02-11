'use client';

import { HOME_DOMAIN } from '@/lib/constants';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function DashNavbarProfileDropdown() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated' && session.user?.name) {
    return (
      <div className="avatar dropdown dropdown-end">
        <div tabIndex={0} className="w-8 cursor-pointer rounded-full">
          {session.user?.image && (
            <Image
              alt="user profile pic"
              src={session.user?.image}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 bg-base-100 p-2 shadow">
          <li>
            <div
              className="btn btn-primary btn-sm mb-2 text-center"
              onClick={() => router.push('/dashboard/account')}>
              Profile
            </div>
          </li>
          <li>
            <div
              className="btn btn-primary btn-sm text-center"
              onClick={() => signOut({ callbackUrl: HOME_DOMAIN })}>
              Log out
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return null;
}
