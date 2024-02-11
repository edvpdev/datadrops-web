'use client';

import { Toasty } from '@/lib/components';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useDeleteAccountDataMutation } from 'redux/apis/accountsApi';
import { openModal } from 'redux/slices';

function DeleteDataButton() {
  const dispatch = useDispatch();
  const [deleteAllData] = useDeleteAccountDataMutation();

  const onDeleteHandler = useCallback(() => {
    dispatch(
      openModal({
        message:
          'Are you sure you want to delete all your data? This action is irreversible',
        onConfirm: async () => {
          await deleteAllData()
            .unwrap()
            .then((res) => {
              toast.custom((t) => (
                <Toasty
                  t={t}
                  type="success"
                  message="Account data was deleted successfully"
                />
              ));
            })
            .catch((err) => {
              toast.custom((t) => (
                <Toasty
                  t={t}
                  type="error"
                  message="Account data deletion was unsuccessful"
                />
              ));
            });
        },
        onCancel: () => {}
      })
    );
  }, [dispatch, deleteAllData]);
  return (
    <button className="btn btn-error btn-sm" onClick={() => onDeleteHandler()}>
      Delete all data
    </button>
  );
}

export default function DeleteAllDataCard() {
  return (
    <div className="card bg-gray-50 text-neutral">
      <div className="card-body">
        <h2 className="card-title">Data</h2>
        <div>You can delete all your data. Account will be untouched.</div>
        <div className="card-actions justify-start">
          <DeleteDataButton />
        </div>
      </div>
    </div>
  );
}
