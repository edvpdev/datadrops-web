'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { Toaster } from 'react-hot-toast';

export default function NextAuthProvider({
  children
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <Toaster toastOptions={{ duration: 2000 }} />
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
