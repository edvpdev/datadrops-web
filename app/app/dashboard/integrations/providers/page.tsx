'use client';

import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { providerIcons } from '@/components/shared/SocialIcons';
import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import ProviderCard from '@/components/dashboard/providers/ProviderCard';
import { useGetProvidersQuery } from 'redux/apis/providersApi';
import { SafeProvider } from '@/lib/types';
import toast from 'react-hot-toast';
import Toasty from '@/components/shared/Toast';
import { Button, Modal } from 'flowbite-react';

interface ModalProps {
  openModal: string | undefined;
  onClose: () => void;
}

function DefaultModal({ openModal, onClose }: ModalProps) {
  return (
    <>
      <Modal show={openModal === 'dismissible'} onClose={onClose}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>I accept</Button>
          <Button color="gray" onClick={onClose}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function ProvidersPage() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const { data: providers } = useGetProvidersQuery();
  console.log(providers);
  const connectFn = () => {
    // toast.custom((t) => (
    //   <Toasty t={t} type="error" message="Synced unsuccessfully" />
    // ));
    setOpenModal('dismissible');
  };
  return (
    <div className="p-12">
      <DefaultModal
        openModal={openModal}
        onClose={() => setOpenModal(undefined)}
      />
      <div className="flex flex-wrap gap-8">
        {providers?.map((provider: SafeProvider) => (
          <ProviderCard
            key={provider.id}
            title={provider.title}
            id={provider.id}
            description={provider.description}
            isBlocked={provider.isBlocked}
            connectFn={connectFn}
          />
        ))}
      </div>
    </div>
  );
}
