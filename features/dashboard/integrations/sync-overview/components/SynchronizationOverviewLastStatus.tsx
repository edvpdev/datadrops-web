'use client';

import { ISynchronization } from '@/lib/types';
import { isoToDateString } from '@/lib/utils/index';
import { isEqual } from 'lodash';
import { memo } from 'react';

interface OverviewLastSyncProps {
  sync: ISynchronization | undefined;
}

const SyncOverviewLastStatus = memo(function SyncOverviewLastStatus({
  sync
}: OverviewLastSyncProps) {
  if (!sync) {
    return (
      <div className="max-w grid rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Last synchronization
        </h5>
        No synchronizations for this entity yet
      </div>
    );
  }
  return (
    <div className="max-w grid rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        Last synchronization
      </h5>
      <p className="text-base font-bold text-gray-700 dark:text-gray-400">
        Date:{' '}
        <span className="font-normal text-gray-700">
          {isoToDateString(sync?.updated_at || '')}
        </span>
      </p>
      {sync?.status === 'failed' && (
        <>
          <p className="text-base font-bold text-gray-700 dark:text-gray-400">
            Status: <span className="text-error">Failed</span>
          </p>
          <p className="gap-0 text-base font-bold text-gray-700 dark:text-gray-400">
            Error message:
          </p>
          <p>{sync?.summary.errMessage}</p>
        </>
      )}
      {sync?.status === 'finished' && (
        <>
          <p className="text-base font-bold text-gray-700 dark:text-gray-400">
            Status: <span className="text-success">Finished</span>
          </p>
          <p className="gap-0 text-base font-bold text-gray-700 dark:text-gray-400">
            Entities synced: {sync?.summary.entitiesSynced}
          </p>
        </>
      )}
      {sync?.status === 'started' && (
        <>
          <p className="text-base font-bold text-gray-700 dark:text-gray-400">
            Status: <span className="text-secondary">Running</span>
          </p>
        </>
      )}
    </div>
  );
}, isEqual);

export default SyncOverviewLastStatus;
