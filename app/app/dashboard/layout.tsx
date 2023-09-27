import getCurrentUser from '@/actions/getCurrentUser';
import DashNavbar from '@/components/dashboard/dash-navbar';
import DashSidebar from '@/components/dashboard/dash-sidebar';
import ClientOnly from '@/components/shared/ClientOnly';
import { ReactNode, Suspense } from 'react';

// export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  // const user = await getCurrentUser();
  return (
    <>
      <Suspense
        fallback={
          <div className="h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-3 py-4 dark:bg-gray-800"></div>
        }>
        <DashSidebar />
      </Suspense>

      <div className="flex h-full w-full flex-col">
        {/* <Suspense
          fallback={
            <div className="flex h-[64px] w-full justify-end bg-gray-50 px-3 py-4"></div>
          }>
          <DashNavbar user={user} />
        </Suspense> */}
        <DashNavbar />
        {/* <ClientOnly>
          <DashNavbar user={user} />
        </ClientOnly> */}

        <div className="">{children}</div>
      </div>
    </>
  );
  // }

  // return (
  //   <div className="auth flex h-screen min-h-screen w-screen">
  //     <Suspense
  //       fallback={
  //         <div className="h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-3 py-4 dark:bg-gray-800"></div>
  //       }>
  //       <DashSidebar />
  //     </Suspense>

  //     <div className="flex h-full w-full flex-col">
  //       <Suspense>
  //         <DashNavbar user={user} />
  //       </Suspense>

  //       <div className="">{children}</div>
  //     </div>
  //   </div>
  // );
}
