'use client';

import { SynchronizationsOverview } from '@/lib/types';
// import SyncOverviewModal from '../../SynchronizationOverview';
import { useCallback, useState } from 'react';
import SynchronizationsOverviewsList from './SynchronizationOverviewsList';
import { SyncOverviewModal, SyncOvContext } from '../../sync-overview';

interface SynchronizationOverviewsProps {
  syncsOvs: SynchronizationsOverview;
}

interface SyncOvState {
  syncOverviewInViewID: string | undefined;
  entityInViewID: string | undefined;
  providerKeyInView: string | undefined;
  isSyncOvModalOpen: string | undefined;
}

export default function SynchronizationOverviews({
  syncsOvs
}: SynchronizationOverviewsProps) {
  const [syncOvState, setSyncOvState] = useState<SyncOvState>({
    syncOverviewInViewID: undefined,
    entityInViewID: undefined,
    providerKeyInView: undefined,
    isSyncOvModalOpen: undefined
  });

  const closeModalFn = useCallback(() => {
    setSyncOvState({
      syncOverviewInViewID: undefined,
      entityInViewID: undefined,
      providerKeyInView: undefined,
      isSyncOvModalOpen: undefined
    });
  }, []);

  const openModalFn = useCallback(
    (
      modal: string,
      lastOrCurrentSyncId: string,
      providerId: string,
      entityLabel: string
    ) => {
      setSyncOvState({
        syncOverviewInViewID: lastOrCurrentSyncId,
        entityInViewID: entityLabel,
        providerKeyInView: providerId,
        isSyncOvModalOpen: modal
      });
    },
    []
  );

  return (
    <SyncOvContext.Provider
      value={{
        syncOverviewInViewID: syncOvState.syncOverviewInViewID,
        entityInViewID: syncOvState.entityInViewID,
        providerKeyInView: syncOvState.providerKeyInView,
        isSyncOvModalOpen: syncOvState.isSyncOvModalOpen,
        openModalFn: openModalFn,
        closeModalFn: closeModalFn
      }}>
      <SyncOverviewModal />
      <SynchronizationsOverviewsList syncOverviews={syncsOvs} />
    </SyncOvContext.Provider>
  );
}
