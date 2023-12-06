import React from 'react';

interface SyncOvContextProps {
  syncOverviewInViewID: string | undefined;
  entityInViewID: string | undefined;
  providerKeyInView: string | undefined;
  isSyncOvModalOpen: string | undefined;
  openModalFn: (
    modal: string,
    lastOrCurrentSyncId: string,
    providerId: string,
    entityLabel: string
  ) => void;
  closeModalFn: () => void;
}

const SyncOvContext = React.createContext<SyncOvContextProps>({
  syncOverviewInViewID: undefined,
  entityInViewID: undefined,
  providerKeyInView: undefined,
  isSyncOvModalOpen: undefined,
  openModalFn: (
    modal: string,
    lastOrCurrentSyncId: string,
    providerId: string,
    entityLabel: string
  ) => {},
  closeModalFn: () => {}
});

export default SyncOvContext;
