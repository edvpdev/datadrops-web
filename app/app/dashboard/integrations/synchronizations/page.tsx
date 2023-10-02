'use client';

import { providerIcons } from '@/components/shared/SocialIcons';
import { cn } from '@/lib/utils';
import { Accordion, CustomFlowbiteTheme } from 'flowbite-react';
import Image from 'next/image';
import { useCallback } from 'react';
import { BsCheck } from 'react-icons/bs';
import { useGetSynchronizationsQuery } from 'redux/apis/synchronizationsApi';

const customTheme: CustomFlowbiteTheme = {
  accordion: {
    title: {
      heading: 'flex gap-2 smth'
    }
  }
};

function SyncButton({
  isLoading,
  isLoaded,
  resyncFn,
  syncFn
}: {
  isLoading: boolean;
  isLoaded: boolean;
  resyncFn: () => void;
  syncFn: () => void;
}) {
  const onClickHandler = useCallback(() => {
    if (isLoading) return;
    if (isLoaded) {
      resyncFn();
    } else {
      syncFn();
    }
  }, [isLoaded, isLoading, resyncFn, syncFn]);
  return (
    <button
      className={cn(
        'btn btn-sm',
        isLoaded && 'bg-success',
        isLoading && 'btn-disabled'
      )}
      onClick={() => onClickHandler()}>
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      {!isLoading && isLoaded && <BsCheck />}
      {isLoading ? 'Synchronizing' : isLoaded ? 'Resync' : 'Sync'}
    </button>
  );
}

export default function SynchronizationsPage() {
  const { data: synchronizations } = useGetSynchronizationsQuery();
  const syncFn = () => {
    // toast.custom((t) => (
    //   <Toasty t={t} type="error" message="Synced unsuccessfully" />
    // ));
    // setOpenModal('dismissible');
  };
  const resyncFn = () => {
    // toast.custom((t) => (
    //   <Toasty t={t} type="error" message="Synced unsuccessfully" />
    // ));
    // setOpenModal('dismissible');
  };
  if (!synchronizations) {
    return null;
  }
  return (
    <div className="p-12">
      <Accordion collapseAll theme={customTheme.accordion}>
        {synchronizations.map((synchronization) => (
          <Accordion.Panel key={synchronization._id}>
            <Accordion.Title className=" bg-gray-50">
              {synchronization.providerTitle}
            </Accordion.Title>
            <Accordion.Content className="bg-gray-100">
              {synchronization.syncedEntities.map((entity) => (
                <div
                  key={entity.id}
                  className="my-2 flex items-center justify-between">
                  <div>{entity.title}</div>
                  <SyncButton
                    isLoading={entity.isLoading}
                    isLoaded={entity.isLoaded}
                    resyncFn={resyncFn}
                    syncFn={syncFn}
                  />
                </div>
              ))}
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
}
