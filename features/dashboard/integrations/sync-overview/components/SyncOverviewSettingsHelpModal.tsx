'use client';

import { TextField } from '@/components/form';
import {
  IProviderEntityDepSettings,
  IProviderEntityDependency
} from '@/lib/types';
import { Modal } from 'flowbite-react';
import { useMemo } from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

import { useGetEntitiesQueryWithType } from 'redux/apis/entitiesApi';

interface SyncOverviewSettingsHelpModalProps {
  openModal: boolean;
  onClose: () => void;
  entitySettingInView: IProviderEntityDepSettings | undefined;
  dependency: IProviderEntityDependency | undefined;
}

export default function SyncOverviewSettingsHelpModal({
  openModal,
  onClose,
  entitySettingInView,
  dependency
}: SyncOverviewSettingsHelpModalProps) {
  // todo
  console.log('rerender', entitySettingInView, dependency);

  const { data, isFetching } = useGetEntitiesQueryWithType(
    {
      providerId: dependency ? dependency!.provider : '',
      entityLabel: dependency ? dependency!.entity : '',
      limit: 1
    },
    {
      skip: !dependency
    }
  );

  const exampleData = useMemo(() => {
    if (!data) return '';

    return data.map((d) => (d as unknown as any).id).join(',');
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <>
      <Modal show={openModal} onClose={onClose}>
        <Modal.Header>
          <div>Example Data</div>
        </Modal.Header>
        <Modal.Body>
          {isFetching && <div>Loading...</div>}
          {data && !isFetching && (
            <>
              <div>
                Below is an example data of the dependant entity. The disabled
                input contains an example value for the sync settings.
              </div>
              <JsonView
                data={data}
                shouldExpandNode={allExpanded}
                style={defaultStyles}
              />
              {entitySettingInView && (
                <TextField
                  fieldSettings={entitySettingInView}
                  value={exampleData}
                  readonly={true}
                />
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
