'use client';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { SynchronizationOverviews } from 'features/dashboard/integrations';

export default function SynchronizationsPage() {
  const synchronizationsOv = useSelector(
    (state: RootState) => state.syncOverview.data
  );

  if (!synchronizationsOv) {
    return null;
  }
  return (
    <>
      <SynchronizationOverviews syncsOvs={synchronizationsOv} />
    </>
  );
}
