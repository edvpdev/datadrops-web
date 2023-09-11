"use client";

import { Sidebar } from "flowbite-react";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

export default function DashSidebar() {
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
            <>
              {route.children ? (
                <Sidebar.Collapse icon={route.icon} label={route.name}>
                  {route.children.map((child, index) => (
                    <Sidebar.Item key={index} href="#" icon={child.icon}>
                      <Link href={child.path}>{child.name}</Link>
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item key={indx} href="#" icon={route.icon}>
                  <Link href={route.path}>{route.name}</Link>
                </Sidebar.Item>
              )}
            </>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
