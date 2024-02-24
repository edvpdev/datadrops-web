'use client';

import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useDeleteAccountMutation } from 'redux/apis/accountsApi';
import { openModal } from 'redux/slices';
import { CanUserUse, Toasty } from '@/lib/components';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

interface Props {
  disabled?: boolean;
}

function DeleteAccountButton({ disabled = false }: Props) {
  const dispatch = useDispatch();
  const [deleteAccount] = useDeleteAccountMutation();

  const onDeleteHandler = useCallback(() => {
    if (disabled) return;
    dispatch(
      openModal({
        message:
          'Are you sure you want to delete your account? This action is irreversible',
        onConfirm: async () => {
          await deleteAccount()
            .unwrap()
            .then((res) => {
              toast.custom((t) => (
                <Toasty
                  t={t}
                  type="success"
                  message="Account deleted successfully"
                />
              ));
              signOut();
            })
            .catch((err) => {
              toast.custom((t) => (
                <Toasty
                  t={t}
                  type="error"
                  message="Account deletion was unsuccessful"
                />
              ));
            });
        },
        onCancel: () => {}
      })
    );
  }, [dispatch, deleteAccount, disabled]);
  return (
    <button
      className={cn(
        'btn btn-error btn-sm',
        disabled && 'btn-disabled cursor-not-allowed'
      )}
      onClick={() => onDeleteHandler()}>
      Delete Account
    </button>
  );
}

export default function DeleteAccountCard() {
  return (
    <div className="card bg-gray-50 text-neutral">
      <div className="card-body">
        <h2 className="card-title">Account</h2>
        <div>Delete your account and data all together.</div>
        <div className="card-actions justify-start">
          <CanUserUse roles={['pro', 'standard']}>
            {(canUse) => <DeleteAccountButton disabled={!canUse} />}
          </CanUserUse>
        </div>
      </div>
    </div>
  );
}
