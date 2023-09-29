'use client';

import { Sidebar } from 'flowbite-react';
import { ROUTES, Route } from '@/lib/constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import ClientOnlyCldImage from '@/components/shared/ClientOnlyCldImage';

export default function DashSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isRouteActive = (route: Route) => {
    return route.children!.some((child) => child.path === pathname);
  };

  return (
    <Sidebar>
      <a href="#" className="mb-5 flex items-center pl-2.5">
        <ClientOnlyCldImage
          alt="Datadrops logo"
          src="datadrops/logo1_y9dxau"
          className="mr-3 h-6 sm:h-7"
          width={50}
          height={28}
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <p>Datadrops</p>
        </span>
      </a>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {ROUTES.map((route, indx) => (
            <div key={indx}>
              {route.children ? (
                <Sidebar.Collapse
                  icon={route.icon}
                  label={route.name}
                  open={isRouteActive(route)}>
                  {route.children.map((child, index) => (
                    <Sidebar.Item
                      key={index}
                      icon={child.icon}
                      onClick={() => router.push(child.path)}
                      active={pathname === child.path}>
                      {child.name}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item
                  icon={route.icon}
                  onClick={() => router.push(route.path)}>
                  {route.name}
                </Sidebar.Item>
              )}
            </div>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
