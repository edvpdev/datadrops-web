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
      <DashSidebar />
      <div className="flex flex-col h-full w-full">
        <DashNavbar />
        <div className="">{children}</div>
      </div>
    </div>
  );
}
