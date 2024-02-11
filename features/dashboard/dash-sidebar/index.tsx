'use client';

import { Sidebar } from 'flowbite-react';
import { ROUTES, Route } from '@/lib/constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import { ClientOnlyCldImage } from '@/lib/components';
import { sidebarTheme } from './custom-sidebar-theme';
import { UpgradeButtonWithModal } from './UpgradeButtonWithModal';
// import { ImBlocked } from 'react-icons/im';

export default function DashSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isRouteActive = (route: Route) => {
    return route.children!.some((child) => child.path === pathname);
  };

  return (
    <Sidebar theme={sidebarTheme}>
      <div>
        <a href="#" className="mb-5 flex items-center pl-2.5">
          <ClientOnlyCldImage
            className="relative"
            src="datadrops/sqq65jgwxrtxhnxljnf4"
            alt="Datadrops"
            width={100}
            height={40}
            mobileHeight={50}
            mobileWidth={50}
          />
        </a>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {ROUTES.map((route, indx) => (
              <div key={indx}>
                {route.children && !route.isBlocked ? (
                  <Sidebar.Collapse
                    icon={route.icon}
                    label={route.name}
                    open={isRouteActive(route)}>
                    {route.children.map((child, index) => (
                      <Sidebar.Item
                        key={index}
                        icon={child.icon}
                        onClick={() => router.push(child.path)}
                        active={pathname === child.path}
                        className="cursor-pointer"
                        theme={{
                          active:
                            'bg-secondary text-secondary-content hover:bg-secondary-focus'
                        }}>
                        {child.name}
                      </Sidebar.Item>
                    ))}
                  </Sidebar.Collapse>
                ) : (
                  // uncomment if under construction routes will be needed
                  // route.isBlocked ? (
                  //   <Sidebar.Item
                  //     icon={ImBlocked}
                  //     onClick={() => {}}
                  //     className="cursor-not-allowed bg-gray-200">
                  //     <div
                  //       className="tooltip tooltip-bottom"
                  //       data-tip="Under construction...">
                  //       {route.name}
                  //     </div>
                  //   </Sidebar.Item>
                  // ) :
                  <Sidebar.Item
                    icon={route.icon}
                    onClick={() => router.push(route.path)}
                    active={pathname === route.path}
                    className="cursor-pointer"
                    theme={{
                      active:
                        'bg-secondary text-secondary-content hover:bg-secondary-focus hover:text-neutral'
                    }}>
                    {route.name}
                  </Sidebar.Item>
                )}
              </div>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </div>
      <UpgradeButtonWithModal />
    </Sidebar>
  );
}
