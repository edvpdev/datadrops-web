'use client';

import { SynchronizationsOverview } from '@/lib/types';
import { Accordion, CustomFlowbiteTheme } from 'flowbite-react';
import SynchronizationOverviewsListItem from './SynchronizationOverviewsListItem';
import { useContext } from 'react';
import SyncOvContext from '../../sync-overview/context/syncOverview.context';

interface SynchronizationOverviewsListProps {
  syncOverviews: SynchronizationsOverview;
}

const customTheme: CustomFlowbiteTheme = {
  accordion: {
    title: {
      heading: 'flex gap-2'
    }
  }
};

export default function SynchronizationsOverviewsList({
  syncOverviews
}: SynchronizationOverviewsListProps) {
  const syncsOvContext = useContext(SyncOvContext);

  return (
    <Accordion collapseAll={false} theme={customTheme.accordion}>
      {Object.keys(syncOverviews).map((providerId) => (
        <Accordion.Panel key={providerId}>
          <Accordion.Title className=" bg-gray-50">
            {providerId}
          </Accordion.Title>
          <Accordion.Content className="bg-gray-100">
            {syncOverviews[providerId].map((overview, indx: number) => (
              <SynchronizationOverviewsListItem
                key={indx}
                setOpenModal={() =>
                  syncsOvContext.openModalFn(
                    'dismissible',
                    overview.currentSyncId || overview.lastSyncId,
                    overview.providerId,
                    overview.entityLabel
                  )
                }
                syncOverview={overview}
              />
            ))}
          </Accordion.Content>
        </Accordion.Panel>
      ))}
    </Accordion>
  );
}
