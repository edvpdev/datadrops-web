import { Providers } from "app/providers";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="flex justify-center min-h-screen h-screen w-screen">
        {children}
      </div>
    </Providers>
  );
}
