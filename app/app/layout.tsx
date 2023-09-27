import getCurrentUser from '@/app/actions/getCurrentUser';
import DashNavbar from '@/components/dashboard/dash-navbar';
import DashSidebar from '@/components/dashboard/dash-sidebar';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, Suspense } from 'react';

// export const dynamic = 'force-dynamic';

export default async function AppLayout({ children }: { children: ReactNode }) {
  // const user = await getCurrentUser();
  // console.log(user);
  // if (user === null || !user.id) {
  return (
    <div className="flex h-screen min-h-screen w-screen justify-center">
      {children}
    </div>
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
