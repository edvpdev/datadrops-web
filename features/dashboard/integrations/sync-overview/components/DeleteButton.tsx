'use client';

import { Toasty } from '@/lib/components';
import { cn } from '@/lib/utils';
import { isEqual } from 'lodash';
import { memo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useDeleteSynchronizationMutation } from 'redux/apis/synchronizationsApi';
import { openModal } from 'redux/slices';

interface DeleteButtonProps {
  syncId: string | undefined;
  className?: string;
}

const DeleteButton = memo(function DeleteButton({
  syncId,
  className
}: DeleteButtonProps) {
  const disabled = false;
  const dispatch = useDispatch();
  const [deleteSynchronization, { isLoading: isDeleting }] =
    useDeleteSynchronizationMutation();

  const handleOpenModal = useCallback(() => {
    dispatch(
      openModal({
        message: 'The latest synchronized data will be deleted.',
        onConfirm: async () => {
          await deleteSynchronization(syncId!)
            .unwrap()
            .then((res) => {
              toast.custom((t) => (
                <Toasty
                  t={t}
                  type="success"
                  message="Last synchronization data was deleted successfully"
                />
              ));
            })
            .catch((err) => {
              toast.custom((t) => (
                <Toasty
                  t={t}
                  type="error"
                  message="Last synchronization data deletion was unsuccessful"
                />
              ));
            });
        },
        onCancel: () => {}
      })
    );
  }, [dispatch, syncId, deleteSynchronization]);

  const onClickHandler = useCallback(() => {
    if (disabled || !syncId) return;

    handleOpenModal();
  }, [handleOpenModal, disabled, syncId]);

  return (
    <button
      className={cn(
        'btn btn-error btn-sm',
        disabled && 'btn-disabled',
        className
      )}
      onClick={() => onClickHandler()}>
      Delete
    </button>
  );
}, isEqual);

export default DeleteButton;
