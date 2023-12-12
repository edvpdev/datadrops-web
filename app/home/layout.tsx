import Footer from '@/components/home/footer';
import Background from '@/features/home/background';
import Bubbles from '@/features/home/bubbles';
import NavBar from '@/features/home/navbar/Navbar';
import { ReactNode } from 'react';

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
