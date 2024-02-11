'use client';

import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useDeleteAccountMutation } from 'redux/apis/accountsApi';
import { openModal } from 'redux/slices';
import { Toasty } from '@/lib/components';
import { signOut } from 'next-auth/react';

function DeleteAccountButton() {
  const dispatch = useDispatch();
  const [deleteAccount] = useDeleteAccountMutation();

  const onDeleteHandler = useCallback(() => {
    dispatch(
      openModal({
        message:
          'Are you sure you want to delete your account? This action is irreversible',
        onConfirm: async () => {
          // TODO: implement delete all data
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
  }, [dispatch, deleteAccount]);
  return (
    <button className="btn btn-error btn-sm" onClick={() => onDeleteHandler()}>
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
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}
