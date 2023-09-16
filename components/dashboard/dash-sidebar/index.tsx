"use client";

import { Sidebar } from "flowbite-react";
import { ROUTES, Route } from "@/lib/constants/routes";
import { usePathname } from "next/navigation";

export default function DashSidebar() {
  const pathname = usePathname();

  const isRouteActive = (route: Route) => {
    return route.children!.some((child) => child.path === pathname);
  };

  return (
    <Sidebar>
      <Sidebar.Logo
        className=""
        href="#"
        img="/logo1.png"
        imgAlt="Datadrops logo"
      >
        <p>Datadrops</p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {ROUTES.map((route, indx) => (
            <div key={indx}>
              {route.children ? (
                <Sidebar.Collapse
                  icon={route.icon}
                  label={route.name}
                  open={isRouteActive(route)}
                >
                  {route.children.map((child, index) => (
                    <Sidebar.Item
                      key={index}
                      icon={child.icon}
                      href={child.path}
                      active={pathname === child.path}
                    >
                      {child.name}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item icon={route.icon} href={route.path}>
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
