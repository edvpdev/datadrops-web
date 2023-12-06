'use client';

import { isoToDateString } from '@/lib/utils/index';
import ShortSummaryWrapper from '../../ShortInlineSummary';
import StatusIndicator from '../../StatusIndicator';
import { ISynchronization } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SyncsHistoryListItemProps {
  sync: ISynchronization;
  index: number;
  setOpenModal: () => void;
}

export default function SyncsHistoryListItem({
  sync,
  index,
  setOpenModal
}: SyncsHistoryListItemProps) {
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
    return (
      <>
        <StatusIndicator status={sync.status} />
        {isoToDateString(sync.updated_at)}
      </>
    );
  };
  return (
    <ShortSummaryWrapper
      button={<Button />}
      preButtonText={<PreButtonText />}
      mainText={`#${index + 1}`}
    />
  );
}
