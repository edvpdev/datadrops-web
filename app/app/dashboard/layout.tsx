import DashNavbar from "@/components/dashboard/dash-navbar";
import DashSidebar from "@/components/dashboard/dash-sidebar";
import { ReactNode, Suspense } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800"></div>
        }
      >
        <DashSidebar />
      </Suspense>

      <div className="flex flex-col h-full w-full">
        <Suspense
          fallback={
            <div className="py-4 px-3 bg-gray-50 w-full flex justify-end h-[64px]"></div>
          }
        >
          <DashNavbar />
        </Suspense>

        <div className="">{children}</div>
      </div>
    </>
  );
}
