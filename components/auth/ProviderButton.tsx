'use client';

import { Provider } from 'next-auth/providers/index';
import { signIn } from 'next-auth/react';

interface ProviderButtonProps {
  provider: Provider;
}

export default function ProviderButton({
  provider
}: ProviderButtonProps) {
  return (
    <div>
      <button
        onClick={() =>
          signIn(provider.id, {
            callbackUrl: 'http://app.localhost:3000'
          })
        }>
        Sign in with {provider.name}
      </button>
    </div>
  );
}
