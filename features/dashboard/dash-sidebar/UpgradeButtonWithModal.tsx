'use client';

import { Modal } from 'flowbite-react';
import { useState } from 'react';

interface UpgradeModalProps {
  isOpen: boolean;
  closeModalFn: () => void;
}

function UpgradeModal({ isOpen, closeModalFn }: UpgradeModalProps) {
  return (
    <Modal show={isOpen} onClose={closeModalFn}>
      <Modal.Header>Upgrade</Modal.Header>
      <Modal.Body>Currently unavailable</Modal.Body>
    </Modal>
  );
}

export function UpgradeButtonWithModal() {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  return (
    <div className="w-full">
      <UpgradeModal
        isOpen={isUpdateModalOpen}
        closeModalFn={() => setIsUpdateModalOpen(false)}
      />
      {/* <button
        className="btn btn-primary w-full"
        onClick={() => setIsUpdateModalOpen(true)}>
        Upgrade
      </button> */}
    </div>
  );
}
