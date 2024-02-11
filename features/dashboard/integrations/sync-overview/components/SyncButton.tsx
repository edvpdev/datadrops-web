'use client';

import { cn } from '@/lib/utils';
import { isEqual } from 'lodash';
import { memo, useCallback } from 'react';

interface SyncButtonProps {
  lastStatus: string;
  onClick: () => void;
  disabled: boolean;
  isSyncing: boolean;
}

const SyncButton = memo(function SyncButton({
  onClick,
  disabled,
  isSyncing,
  lastStatus
}: SyncButtonProps) {
  const onClickHandler = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  return (
    <button
      className={cn('btn btn-primary btn-sm', disabled && 'btn-disabled')}
      onClick={() => onClickHandler()}>
      {(lastStatus === 'started' || isSyncing) && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      {lastStatus === 'started' || isSyncing
        ? 'Synchronizing'
        : !lastStatus
        ? 'Sync'
        : 'Resync'}
    </button>
  );
}, isEqual);

export default SyncButton;
