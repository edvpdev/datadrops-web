import { Button, Modal } from 'flowbite-react';
import { isEqual } from 'lodash';
import { memo, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface ConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal = memo(function ConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
  message
}: ConfirmationModalProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Modal show={isOpen} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => {
                setOpenModal(false);
                onConfirm();
              }}>
              Confirm
            </Button>
            <Button
              color="gray"
              onClick={() => {
                setOpenModal(false);
                onCancel();
              }}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}, isEqual);

export default ConfirmationModal;
