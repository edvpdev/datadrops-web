import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { cn, constructMetadata } from '@/lib/utils';
import Background from '@/components/home/background';
import Footer from '@/components/home/footer';
import NavBar from '@/components/home/navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-[calc(100dvh)]">
      <body className={cn('', inter.className)}>
        <div className="flex min-h-screen flex-col justify-between">
          <NavBar />
          <main className="flex min-h-screen w-full flex-col items-center">
            {children}
          </main>
          <Footer />
          <Background />
        </div>
      </body>
    </html>
  );
}
