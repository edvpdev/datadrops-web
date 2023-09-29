import DashNavbar from '@/components/dashboard/dash-navbar';
import DashSidebar from '@/components/dashboard/dash-sidebar';
import { ReactNode } from 'react';

export default async function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <>
      <DashSidebar />
      <div className="flex h-full w-full flex-col">
        <DashNavbar />
        <div className="">{children}</div>
      </div>
    </>
  );
}
