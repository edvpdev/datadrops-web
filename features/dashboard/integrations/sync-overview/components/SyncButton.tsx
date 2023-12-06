'use client';

import { cn } from '@/lib/utils';
import { isEqual } from 'lodash';
import { memo, useCallback } from 'react';

interface SyncButtonProps {
  lastStatus: string;
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const SyncButton = memo(function SyncButton({
  lastStatus,
  onClick,
  disabled,
  isLoading
}: SyncButtonProps) {
  const onClickHandler = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  return (
    <button
      className={cn('btn btn-sm bg-success', disabled && 'btn-disabled')}
      onClick={() => onClickHandler()}>
      {(lastStatus === 'started' || isLoading) && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      {lastStatus === 'started' || isLoading
        ? 'Synchronizing'
        : !lastStatus
        ? 'Sync'
        : 'Resync'}
    </button>
  );
}, isEqual);

export default SyncButton;
