'use client';

import ProviderCard from 'features/dashboard/integrations/ProviderCard';
import { useGetProvidersQuery } from 'redux/apis/providersApi';
import { IProviderWithStatus } from '@/lib/types';
import { signIn, useSession } from 'next-auth/react';
import { useCustomLog } from '@/lib/hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useEffect } from 'react';

// export async function getServerSideProps() {
//   // Pass data to the page via props
//   return { props: { data: [] } };
// }

export default function ProvidersPage() {
  // const { data: providers } = useGetProvidersQuery();
  const providers = useSelector((state: RootState) => state.userProviders.data);

  const customLog = useCustomLog();
  // customLog.debug('session', session ? session : undefined);
  const connectFn = (providerID: string) => {
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
