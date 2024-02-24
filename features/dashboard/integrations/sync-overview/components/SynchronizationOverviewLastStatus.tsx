'use client';

import { ISynchronization } from '@/lib/types';
import { isoToDateString } from '@/lib/utils/index';
import { isEqual } from 'lodash';
import { memo } from 'react';
import DeleteButton from './DeleteButton';
import { CanUserUse } from '@/lib/components';

interface OverviewLastSyncProps {
  sync: ISynchronization | undefined;
  historyMode?: boolean;
}

const SyncOverviewLastStatus = memo(function SyncOverviewLastStatus({
  sync,
  historyMode = false
}: OverviewLastSyncProps) {
  if (!sync) {
    return (
      <div className="max-w grid rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
          {historyMode ? 'Synchronization' : 'Last synchronization'}
        </h5>
        No synchronizations for this entity yet
      </div>
    );
  }
  return (
    <div className="max-w grid rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
        {historyMode ? 'Synchronization' : 'Last synchronization'}
      </h5>
      <p className="text-base font-bold text-gray-700">
        Date:{' '}
        <span className="font-normal text-gray-700">
          {isoToDateString(sync?.updated_at || '')}
        </span>
      </p>
      {sync?.status === 'failed' && (
        <>
          <p className="text-base font-bold text-gray-700">
            Status: <span className="text-error">Failed</span>
          </p>
          <p className="gap-0 text-base font-bold text-gray-700">
            Error message:
          </p>
          <p>{sync?.summary.errMessage}</p>
        </>
      )}
      {sync?.status === 'finished' && (
        <>
          <p className="text-base font-bold text-gray-700">
            Status: <span className="text-success">Finished</span>
          </p>
          <p>
            <span className="gap-0 text-base font-bold text-gray-700">
              Entities synced:{' '}
            </span>
            {sync?.summary.entitiesSynced}
          </p>
          <p>
            <span className="gap-0 text-base font-bold text-gray-700">
              Time elapsed:
            </span>{' '}
            {sync?.summary.timeElapsed} seconds
          </p>
        </>
      )}
      {sync?.status === 'started' && (
        <>
          <p className="text-base font-bold text-gray-700">
            Status: <span className="text-secondary">Running</span>
          </p>
        </>
      )}
      {sync?.status !== 'started' && !historyMode && (
        <CanUserUse roles={['pro', 'standard']}>
          {(canUse) => (
            <DeleteButton
              className="mt-2 w-1/4"
              syncId={sync._id}
              disabled={!canUse}
            />
          )}
        </CanUserUse>
      )}
    </div>
  );
}, isEqual);

export default SyncOverviewLastStatus;
