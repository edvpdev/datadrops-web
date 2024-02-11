import ConfirmationModal from '@/lib/components/ConfirmationModal';
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
        {/*  <div className="h-[calc(100%-64px)] overflow-y-auto"> */}
        <div className="flex flex-grow flex-col overflow-hidden">
          <IntegrationsWrapper>
            <ConfirmationModal />
            {children}
          </IntegrationsWrapper>
        </div>
      </div>
    </>
  );
}
