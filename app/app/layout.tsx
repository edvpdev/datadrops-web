import { ReactNode } from 'react';
import NextAuthProvider from './appProviders';

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <NextAuthProvider>
      <div className="flex h-screen min-h-screen w-screen justify-center">
        {children}
      </div>
    </NextAuthProvider>
  );
}
