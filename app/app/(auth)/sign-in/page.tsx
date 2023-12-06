'use client';

import { PROVIDERS } from '@/lib/constants';
import ProviderButton from 'features/auth/ProviderButton';
import { useSession } from 'next-auth/react';

export default function SignIn() {
  const { data: session, status } = useSession();
  if (status !== 'authenticated') {
    return (
      <>
        {PROVIDERS.map((provider) => (
          <ProviderButton key={provider._id} provider={provider} />
        ))}
      </>
    );
  }
  return <></>;
}
