'use client';

import { providerIcons } from '@/lib/components';
import { useCustomLog } from '@/lib/hooks';
import { IProviderWithStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

function ConnectButton({
  isBlocked,
  providerID
}: {
  isBlocked: boolean;
  providerID: string;
}) {
  const customLog = useCustomLog();
  const onClickHandler = useCallback(() => {
    if (isBlocked) return;
    customLog.info('Provider connect', {
      type: 'client',
      subtype: 'conversion',
      data: {
        providerID
      }
    });
    signIn(providerID);
  }, [isBlocked, customLog, providerID]);
  return (
    <button
      className={cn('btn btn-sm bg-success', isBlocked && 'btn-disabled')}
      onClick={() => onClickHandler()}>
      {isBlocked ? 'In use' : 'Connect'}
    </button>
  );
}

function ManageButton({ providerID }: { providerID: string }) {
  const customLog = useCustomLog();

  const onDisconnectHandler = useCallback(() => {
    customLog.info('Provider disconnect', {
      type: 'client',
      subtype: 'conversion',
      data: {
        providerID
      }
    });
  }, [customLog, providerID]);

  const onDataDeleteHandler = useCallback(() => {
    customLog.info('Provider delete data', {
      type: 'client',
      subtype: 'conversion',
      data: {
        providerID
      }
    });
  }, [customLog, providerID]);

  return (
    <div className="dropdown">
      <div tabIndex={0} className={cn('btn btn-sm bg-error')}>
        Manage
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box z-[1] mt-1 w-52 bg-base-100 p-2 shadow">
        <li onClick={() => onDisconnectHandler()}>
          <a>Disconnect</a>
        </li>
        <li onClick={() => onDataDeleteHandler()}>
          <a>Delete data</a>
        </li>
      </ul>
    </div>
  );
}

interface ProviderCardProps {
  provider: IProviderWithStatus;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const { title, description, isBlocked, _id, key } = provider;
  return (
    <div className="card h-56 w-80 bg-gray-50 text-primary-content">
      <div className="card-body">
        <h2 className="card-title">
          {providerIcons[title] || null}
          {title}
        </h2>
        <div className="h-20">{description}</div>
        <div className="card-actions justify-end">
          {isBlocked && key !== 'google' && <ManageButton providerID={key} />}
          <ConnectButton isBlocked={isBlocked} providerID={key} />
        </div>
      </div>
    </div>
  );
}
