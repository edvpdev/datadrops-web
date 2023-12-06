'use client';

import ProviderCard from 'features/dashboard/integrations/ProviderCard';
import { useGetProvidersQuery } from 'redux/apis/providersApi';
import { IProvider, IProviderWithStatus } from '@/lib/types';
import { signIn, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export default function ProvidersPage() {
  const { data: providers } = useGetProvidersQuery();
  const { data: session, status } = useSession();
  console.log(session);
  const connectFn = (providerID: string) => {
    // toast.custom((t) => (
    //   <Toasty t={t} type="error" message="Synced unsuccessfully" />
    // ));
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
