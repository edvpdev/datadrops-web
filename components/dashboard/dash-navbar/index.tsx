"use client";

import { UserButton } from "@clerk/nextjs";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

export default function DashNavbar() {
  return (
    <div className="py-4 px-3 bg-gray-50 w-full flex justify-end">
      <ul>
        <li>
          <UserButton />
        </li>
      </ul>
    </div>
  );
}
