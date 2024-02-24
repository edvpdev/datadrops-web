'use client';

import { IProvider } from '@/lib/types';
import { signIn } from 'next-auth/react';
import { APP_DOMAIN } from '@/lib/constants';
import { providerIcons } from '@/lib/components';

interface ProviderButtonProps {
  provider: Pick<IProvider, 'title' | '_id'>;
}

export default function ProviderButton({ provider }: ProviderButtonProps) {
  return (
    <div>
      <div
        className="btn btn-primary btn-outline"
        onClick={() => {
          if (provider._id === 'credentials') {
            return signIn(provider._id, {
              callbackUrl: APP_DOMAIN
            });
          }
          signIn(provider._id, {
            callbackUrl: APP_DOMAIN
          });
        }}>
        {providerIcons[provider.title] || null}
        {provider.title}
      </div>
    </div>
  );
}
