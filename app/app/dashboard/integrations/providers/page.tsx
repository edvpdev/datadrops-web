'use client';

import ProviderCard from '@/components/dashboard/integrations/providers/ProviderCard';
import { IProviderWithStatus } from '@/lib/types';
import { signOut, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useEffect } from 'react';

export default function ProvidersPage() {
  const providers = useSelector((state: RootState) => state.userProviders.data);
  const session = useSession();

  useEffect(() => {
    if (session?.data?.error) {
      // toast.error('Your account is blocked');
      signOut();
    }
  }, [session]);

  return (
    <div className="flex flex-wrap gap-8">
      {providers.map((provider: IProviderWithStatus) => (
        <ProviderCard key={provider.key} provider={provider} />
      ))}
    </div>
  );
}
