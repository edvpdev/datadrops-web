"use client";

import ClientOnly from "@/components/shared/ClientOnly";
import { UserButton } from "@clerk/nextjs";

export default function DashNavbar() {
  return (
    <div className="py-4 px-3 bg-gray-50 w-full flex justify-end h-[64px]">
      <ul>
        <li>
          <ClientOnly>
            <UserButton />
          </ClientOnly>
        </li>
      </ul>
    </div>
  );
}
