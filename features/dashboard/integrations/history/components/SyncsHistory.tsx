'use client';

import { ISynchronization } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import SyncsOverviewHistoryList from './SyncsOverviewHistoryList';
import SyncsHistoryListFilters from './SyncsHistoryListFilters';
import { SyncOvContext, SyncOverviewModal } from '../../sync-overview';
import { FlowbitePaginationTheme, Pagination } from 'flowbite-react';

interface SyncsOverviewHistoryListProps {
  syncs: ISynchronization[];
}

interface SyncOvState {
  syncOverviewInViewID: string | undefined;
  entityInViewID: string | undefined;
  providerKeyInView: string | undefined;
  isSyncOvModalOpen: string | undefined;
}

const PAGINATION_AMOUNT = 8;

const customTheme: FlowbitePaginationTheme = {
  base: '',
  layout: {
    table: {
      base: 'text-sm text-gray-700 dark:text-gray-400',
      span: 'font-semibold text-gray-900 dark:text-white'
    }
  },
  pages: {
    base: 'xs:mt-0 inline-flex -space-x-px',
    showIcon: 'inline-flex',
    previous: {
      base: 'ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
      icon: 'h-5 w-5'
    },
    next: {
      base: 'rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
      icon: 'h-5 w-5'
    },
    selector: {
      base: 'w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
      active:
        'bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
      disabled: 'opacity-50 cursor-normal'
    }
  }
};

export default function SyncsHistory({ syncs }: SyncsOverviewHistoryListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [historySyncs, setHistorySyncs] = useState<ISynchronization[]>([]);
  const [syncOvState, setSyncOvState] = useState<SyncOvState>({
    syncOverviewInViewID: undefined,
    entityInViewID: undefined,
    providerKeyInView: undefined,
    isSyncOvModalOpen: undefined
  });

  useEffect(() => {
    const sortedSyncs = [...syncs].sort((a, b) =>
      a.updated_at.localeCompare(b.updated_at) ? -1 : 1
    );
    setHistorySyncs(sortedSyncs);
  }, [syncs]);

  const onPageChange = (page: number) => setCurrentPage(page);

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
      <SyncOverviewModal historyMode={true} />
      <SyncsHistoryListFilters syncs={syncs} setSyncs={setHistorySyncs} />
      <div className="mb-4 flex justify-end overflow-x-auto rounded-md bg-gray-50 p-2">
        {!!historySyncs.length && (
          <Pagination
            layout="navigation"
            currentPage={currentPage}
            totalPages={Math.ceil(historySyncs.length / PAGINATION_AMOUNT)}
            onPageChange={onPageChange}
            theme={customTheme}
          />
        )}
      </div>
      <SyncsOverviewHistoryList
        syncs={historySyncs.slice(
          (currentPage - 1) * (1 * PAGINATION_AMOUNT),
          currentPage * (1 * PAGINATION_AMOUNT)
        )}
      />
      {/* to make generic, two pages should be able to use one context specifically for modal */}
    </SyncOvContext.Provider>
  );
}
