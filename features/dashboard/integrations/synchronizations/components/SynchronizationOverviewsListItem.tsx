'use client';

import { isoToDateString } from '@/lib/utils/index';
import ShortSummaryWrapper from '../../ShortInlineSummary';
import StatusIndicator from '../../StatusIndicator';
import { SynchronizationOverview } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SynchronizationOverviewsListItemProps {
  syncOverview: SynchronizationOverview;
  setOpenModal: () => void;
}

export default function SynchronizationOverviewsListItem({
  syncOverview,
  setOpenModal
}: SynchronizationOverviewsListItemProps) {
  const Button = () => {
    return (
      <button
        className={cn('btn btn-sm')}
        onClick={() => {
          setOpenModal();
        }}>
        Details
      </button>
    );
  };

  const PreButtonText = () => {
    return syncOverview.currentSyncId ? (
      <>
        <StatusIndicator status={syncOverview.currentSyncStatus} />
        {isoToDateString(syncOverview.currentSyncUpdatedAt)}
      </>
    ) : (
      syncOverview.lastSyncId && (
        <>
          <StatusIndicator status={syncOverview.lastSyncStatus} />
          {isoToDateString(syncOverview.lastSyncUpdatedAt)}
        </>
      )
    );
  };
  return (
    <ShortSummaryWrapper
      button={<Button />}
      preButtonText={<PreButtonText />}
      mainText={syncOverview.entityLabelTitle}
    />
  );
}
