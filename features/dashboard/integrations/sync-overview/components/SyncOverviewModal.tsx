'use client';

import { IProviderEntity } from '@/lib/types';
import { Modal } from 'flowbite-react';
import { createRef, memo, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRunSynchronizationMutation } from 'redux/apis/synchronizationsApi';
import SyncButton from './SyncButton';
import SyncOverviewSettings from './SyncOverviewModalSettings';
import SyncOverviewDetails from './SynchronizationOverviewDetails';
import SyncOverviewLastStatus from './SynchronizationOverviewLastStatus';
import { FormErrors } from '@/components/form/SyncsSettingsForm';
import { Toasty } from '@/lib/components';
import toast from 'react-hot-toast';
import { RootState } from 'redux/store';
import SyncOvContext from '../context/syncOverview.context';

interface SyncOverviewModalProps {
  historyMode?: boolean;
}

interface IFormInputs {
  generalSettings: {
    limit?: boolean;
    overwrite: boolean;
  };
  entitySettings: any;
}

const SyncOverviewModal = memo(function DefaultModal({
  historyMode = false
}: SyncOverviewModalProps) {
  const {
    syncOverviewInViewID,
    entityInViewID,
    providerKeyInView,
    closeModalFn,
    isSyncOvModalOpen
  } = useContext(SyncOvContext);

  console.log(
    syncOverviewInViewID,
    entityInViewID,
    providerKeyInView,
    closeModalFn,
    isSyncOvModalOpen
  );

  const [runSynchronization, { isLoading: isSyncing }] =
    useRunSynchronizationMutation();

  const entity = useSelector((state: RootState) =>
    state.userEntities.data.find((entity) => entity.id === entityInViewID)
  );
  const sync = useSelector((state: RootState) =>
    state.userSyncs.data.find((sync) => sync._id === syncOverviewInViewID)
  );

  const formRef = createRef<{
    getFormState: () => any;
    getFormErrors: () => any;
    validateForm: () => FormErrors;
  }>();

  const syncFn = useCallback(
    async (entity: IProviderEntity | undefined, syncSettings: IFormInputs) => {
      console.log('sync', entity);
      if (!entity || !providerKeyInView) return;

      //   console.log({
      //     providerId: providerKeyInView,
      //     entityLabel: entity.id,
      //     ...syncSettings
      //   });
      await runSynchronization({
        providerId: providerKeyInView,
        entityLabel: entity.id,
        ...syncSettings
      })
        .unwrap()
        .then((res) => {
          //   console.log(res);
          toast.custom((t) => (
            <Toasty t={t} type="success" message="Synced successfully" />
          ));
          closeModalFn();
        })
        .catch((err) => {
          toast.custom((t) => (
            <Toasty t={t} type="error" message="Synced unsuccessfully" />
          ));
        });
    },
    [runSynchronization, providerKeyInView, closeModalFn]
  );

  if (!entity) return null;

  return (
    <>
      <Modal show={isSyncOvModalOpen === 'dismissible'} onClose={closeModalFn}>
        <Modal.Header>
          <div>Overview</div>
          <div className="text-sm">Entity: {entity?.title}</div>
        </Modal.Header>
        <Modal.Body>
          <div className="grid gap-2">
            {!historyMode && <SyncOverviewDetails entity={entity} />}
            <SyncOverviewLastStatus sync={sync} />
            <SyncOverviewSettings
              entity={entity}
              readonly={historyMode}
              ref={formRef}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!historyMode && (
            <SyncButton
              disabled={isSyncing || sync?.status === 'started'}
              lastStatus={sync?.status || ''}
              isLoading={isSyncing}
              onClick={() => {
                // // console.log(syncSettings);
                // console.log(formRef.current?.getFormState());
                // console.log(formRef.current?.validateForm());
                // console.log(formRef.current?.getFormErrors());
                const validation = formRef.current?.validateForm();

                if (validation && Object.values(validation).length > 0) return;

                const settings = formRef.current?.getFormState();
                if (
                  entity.dependsOn.length > 0 &&
                  Object.keys(settings?.entitySettings).length === 0
                )
                  return;

                syncFn(entity, settings);
              }}
            />
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default SyncOverviewModal;
