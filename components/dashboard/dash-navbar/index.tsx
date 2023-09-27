import getCurrentUser from '@/actions/getCurrentUser';
import DashNavbarProfileDropdown from './DashNavbarProfileDropdown';
import { useSession } from 'next-auth/react';
import { SafeUser } from '@/lib/types';
import ClientOnly from '@/components/shared/ClientOnly';

interface NavBarProps {
  user: SafeUser | null;
}

export default async function DashNavbar() {
  // const user = await getCurrentUser();
  return (
    <div className="flex h-[64px] w-full justify-end bg-gray-50 px-3 py-4">
      <ul>
        <li className="">
          {/* <ClientOnly>
            <DashNavbarProfileDropdown user={user} />
          </ClientOnly> */}
        </li>
      </ul>
    </div>
  );
}
