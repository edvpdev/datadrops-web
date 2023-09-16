import DashNavbar from "@/components/dashboard/dash-navbar";
import DashSidebar from "@/components/dashboard/dash-sidebar";
import { auth } from "@clerk/nextjs";
import { ReactNode, Suspense } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    return (
      <div className="non-auth flex justify-center min-h-screen h-screen w-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="auth flex min-h-screen h-screen w-screen">
      <Suspense
        fallback={
          <div className="h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800"></div>
        }
      >
        <DashSidebar />
      </Suspense>

      <div className="flex flex-col h-full w-full">
        <Suspense>
          <DashNavbar />
        </Suspense>

        <div className="">{children}</div>
      </div>
    </div>
  );
}
