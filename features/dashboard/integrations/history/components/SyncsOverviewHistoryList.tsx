'use client';

import { memo, useContext } from 'react';
import SyncsHistoryListItem from './SyncsOverviewHistoryListItem';
import { ISynchronization } from '@/lib/types';
import { isEqual } from 'lodash';
import { SyncOvContext } from '../../sync-overview';

interface SyncsOverviewHistoryListProps {
  syncs: ISynchronization[];
}

const SyncsOverviewHistoryList = memo(function SyncsOverviewHistoryList({
  syncs
}: SyncsOverviewHistoryListProps) {
  const { openModalFn } = useContext(SyncOvContext);

  return (
    <>
      {syncs.map((sync, indx) => (
        <div key={sync._id} className="mb-2 rounded-md bg-gray-50 px-4 py-2">
          <SyncsHistoryListItem
            key={indx}
            index={indx}
            setOpenModal={() =>
              openModalFn(
                'dismissible',
                sync._id,
                sync.providerId,
                sync.entityLabel
              )
            }
            sync={sync}
          />
        </div>
      ))}
    </>
  );
}, isEqual);

export default SyncsOverviewHistoryList;
