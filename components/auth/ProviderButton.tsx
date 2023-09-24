'use client';

import { SafeProvider } from '@/lib/types';
import { Provider } from 'next-auth/providers/index';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

interface ProviderButtonProps {
  provider: SafeProvider;
}

const providerIcons: { [x: string]: React.ReactNode } = {
  Google: <FcGoogle />
};

export default function ProviderButton({ provider }: ProviderButtonProps) {
  return (
    <div>
      <div
        className="btn"
        onClick={() =>
          signIn(provider.id, {
            callbackUrl: 'http://app.localhost:3000'
          })
        }>
        {providerIcons[provider.name]}
        Sign in with {provider.name}
      </div>
    </div>
  );
}
