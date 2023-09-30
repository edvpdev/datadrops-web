import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { cn, constructMetadata } from '@/lib/utils';
import ClientOnly from '@/components/shared/ClientOnly';
import { Analytics } from '@vercel/analytics/react';
import { isPagePrivate } from '@/lib/middleware/utils';
import RootProviders from './providers';

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
        <ClientOnly>
          <RootProviders />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
