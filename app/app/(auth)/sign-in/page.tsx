'use client';

import Raindrops from '@/components/home/raindrops';
import { ClientOnlyCldImage } from '@/lib/components';
import { PROVIDERS } from '@/lib/constants';
import ProviderButton from 'features/auth/ProviderButton';
import { useSession } from 'next-auth/react';

export default function SignIn() {
  const { data: session, status } = useSession();
  if (status !== 'authenticated') {
    return (
      <div className="flex h-full w-full">
        <div className="h-full w-full basis-3/4 bg-primary pb-20 pl-20 pr-40 pt-40">
          <Raindrops fill="#fff" />
        </div>
        <div className="items-left flex h-full w-full basis-1/4 flex-col justify-center gap-4 px-8">
          <ClientOnlyCldImage
            className="relative"
            src="datadrops/sqq65jgwxrtxhnxljnf4"
            alt="Datadrops"
            width={100}
            height={40}
            mobileHeight={50}
            mobileWidth={50}
          />
          <div className="font-bold text-neutral">Sign in with</div>
          {PROVIDERS.map((provider) => (
            <ProviderButton key={provider._id} provider={provider} />
          ))}
          <ProviderButton
            key={'credentials'}
            provider={{ title: 'Credentials', _id: 'credentials' }}
          />
        </div>
      </div>
    );
  }
  return <></>;
}
