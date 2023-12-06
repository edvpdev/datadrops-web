import { ClientOnly } from '@/lib/components';
import DashNavbarProfileDropdown from './DashNavbarProfileDropdown';

export default async function DashNavbar() {
  return (
    <div className="flex h-[64px] w-full justify-end bg-gray-50 px-3 py-4">
      <ul>
        <li className="">
          <ClientOnly>
            <DashNavbarProfileDropdown />
          </ClientOnly>
        </li>
      </ul>
    </div>
  );
}
