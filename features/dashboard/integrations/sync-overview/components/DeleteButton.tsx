import { cn } from '@/lib/utils';
import { isEqual } from 'lodash';
import { memo, useCallback } from 'react';

interface DeleteButtonProps {
  syncId: string | undefined;
  className?: string;
}

const DeleteButton = memo(function DeleteButton({
  syncId,
  className
}: DeleteButtonProps) {
  const disabled = false;
  const onClickHandler = useCallback(() => {
    if (disabled || !syncId) return;
    console.log('delete sync', syncId);
  }, [disabled, syncId]);

  return (
    <button
      className={cn(
        'btn btn-sm bg-error',
        disabled && 'btn-disabled',
        className
      )}
      onClick={() => onClickHandler()}>
      Delete
    </button>
  );
}, isEqual);

export default DeleteButton;
