'use client';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { SyncsHistory } from '@/components/dashboard/integrations/history';

export default function SynchronizationsHistoryPage() {
  const syncs = useSelector((state: RootState) => state.userSyncs.data);

  return (
    <>
      <SyncsHistory syncs={syncs} />
    </>
  );
}
