'use client';

import { Button, Modal } from 'flowbite-react';

import { useSelector } from 'react-redux';
import { closeModal } from 'redux/slices/confirmModalSlice';
import { RootState } from 'redux/store';
import { useAppDispatch } from '../hooks';

export default function ConfirmationModal() {
  const { isOpen, message, onCancel, onConfirm } = useSelector(
    (state: RootState) => state.confirmationModal
  );
  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    dispatch(closeModal());
  };
  const onCancelHandler = () => {
    onCancel && onCancel();
    dispatch(closeModal());
  };
  const onConfirmHandler = () => {
    onConfirm && onConfirm();
    dispatch(closeModal());
  };

  return (
    <Modal dismissible show={isOpen} size="md" onClose={() => onCloseHandler()}>
      <Modal.Body>
        <div className="text-center">
          {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            {onConfirm && (
              <Button color="failure" onClick={() => onConfirmHandler()}>
                Confirm
              </Button>
            )}
            {onCancel && (
              <Button color="gray" onClick={() => onCancelHandler()}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
