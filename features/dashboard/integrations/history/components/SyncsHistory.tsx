'use client';

import { ISynchronization } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import SyncsOverviewHistoryList from './SyncsOverviewHistoryList';
import SyncsHistoryListFilters from './SyncsHistoryListFilters';
import { SyncOvContext, SyncOverviewModal } from '../../sync-overview';

interface SyncsOverviewHistoryListProps {
  syncs: ISynchronization[];
}

interface SyncOvState {
  syncOverviewInViewID: string | undefined;
  entityInViewID: string | undefined;
  providerKeyInView: string | undefined;
  isSyncOvModalOpen: string | undefined;
}

export default function SyncsHistory({ syncs }: SyncsOverviewHistoryListProps) {
  const [historySyncs, setHistorySyncs] = useState<ISynchronization[]>([]);
  const [syncOvState, setSyncOvState] = useState<SyncOvState>({
    syncOverviewInViewID: undefined,
    entityInViewID: undefined,
    providerKeyInView: undefined,
    isSyncOvModalOpen: undefined
  });

  useEffect(() => {
    console.log('here');
    setHistorySyncs(syncs);
  }, [syncs]);

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
      console.log(modal, lastOrCurrentSyncId, providerId, entityLabel);
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
      {/* to make generic, two pages should be able to use one context specifically for modal */}
      <SyncOverviewModal historyMode={true} />
      <SyncsHistoryListFilters
        syncs={historySyncs}
        setSyncs={setHistorySyncs}
      />
      <SyncsOverviewHistoryList syncs={historySyncs} />
    </SyncOvContext.Provider>
  );
}
