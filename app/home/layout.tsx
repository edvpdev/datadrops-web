import Footer from "@/components/footer";
import Background from "@/components/home/background";
import Bubbles from "@/components/home/bubbles";
import NavBar from "@/components/home/navbar/Navbar";
import { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <NavBar />
      <main className="flex min-h-screen flex-col items-center">
        {children}
      </main>
      <Footer />
      <Background />
      <Bubbles />
    </div>
  );
}
