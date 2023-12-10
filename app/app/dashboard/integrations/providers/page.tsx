'use client';

import ProviderCard from '@/components/dashboard/integrations/providers/ProviderCard';
import { IProviderWithStatus } from '@/lib/types';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useEffect } from 'react';
import { useCustomLog } from '@/lib/hooks';

export default function ProvidersPage() {
  const providers = useSelector((state: RootState) => state.userProviders.data);
  const customLog = useCustomLog();
  const session = useSession();

  useEffect(() => {
    if (session?.data?.error) {
      // toast.error('Your account is blocked');
      signOut();
    }
  }, [session]);

  const connectFn = (providerID: string) => {
    customLog.info('Provider connect', {
      type: 'client',
      subtype: 'conversion',
      data: {
        providerID
      }
    });
    signIn(providerID);
  };

  return (
    <div className="flex flex-wrap gap-8">
      {providers?.map((provider: IProviderWithStatus) => (
        <ProviderCard
          key={provider.key}
          title={provider.title}
          id={provider.key}
          description={provider.description}
          isBlocked={provider.isBlocked}
          connectFn={() => connectFn(provider.key)}
        />
      ))}
    </div>
  );
}
