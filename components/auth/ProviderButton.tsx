'use client';

import { SafeProvider } from '@/lib/types';
import { signIn } from 'next-auth/react';
import { providerIcons } from '../shared/SocialIcons';
import { APP_DOMAIN } from '@/lib/constants';

interface ProviderButtonProps {
  provider: Pick<SafeProvider, 'title' | 'id'>;
}

export default function ProviderButton({ provider }: ProviderButtonProps) {
  return (
    <div>
      <div
        className="btn"
        onClick={() =>
          signIn(provider.id, {
            callbackUrl: APP_DOMAIN
          })
        }>
        {providerIcons[provider.title]}
        Sign in with {provider.title}
      </div>
    </div>
  );
}
