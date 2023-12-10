'use client';

import { providerIcons } from '@/lib/components';
import { useCustomLog } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

function ConnectButton({
  isBlocked,
  connectFn
}: {
  isBlocked: boolean;
  connectFn: () => void;
}) {
  const onClickHandler = useCallback(() => {
    if (isBlocked) return;
    connectFn();
  }, [isBlocked, connectFn]);
  return (
    <button
      className={cn('btn btn-sm bg-success', isBlocked && 'btn-disabled')}
      onClick={() => onClickHandler()}>
      {isBlocked ? 'In use' : 'Connect'}
    </button>
  );
}

function DisconnectButton({ providerID }: { providerID: string }) {
  const customLog = useCustomLog();
  const onClickHandler = useCallback(() => {
    customLog.info('Provider disconnect', {
      type: 'client',
      subtype: 'conversion',
      data: {
        providerID
      }
    });
  }, [customLog, providerID]);
  return (
    <button
      className={cn('btn btn-sm bg-error')}
      onClick={() => onClickHandler()}>
      Disconnect
    </button>
  );
}

interface ProviderCardProps {
  title: string;
  id: string;
  description: string;
  isBlocked: boolean;
  connectFn: () => void;
}

export default function ProviderCard({
  title,
  description,
  isBlocked,
  connectFn,
  id
}: ProviderCardProps) {
  return (
    <div className="card w-80 bg-gray-50 text-primary-content">
      <div className="card-body">
        <h2 className="card-title">
          {providerIcons[title] || null}
          {title}
        </h2>
        <div className="h-20">{description}</div>
        <div className="card-actions justify-end">
          {isBlocked && id !== 'google' && <DisconnectButton providerID={id} />}
          <ConnectButton isBlocked={isBlocked} connectFn={connectFn} />
        </div>
      </div>
    </div>
  );
}
