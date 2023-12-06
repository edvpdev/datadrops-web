import DashNavbar from 'features/dashboard/dash-navbar';
import DashSidebar from 'features/dashboard/dash-sidebar';
import { IntegrationsWrapper } from 'features/dashboard/integrations';
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
        <div className="w-[100% - 16rem]">
          <IntegrationsWrapper>{children}</IntegrationsWrapper>
        </div>
      </div>
    </>
  );
}
