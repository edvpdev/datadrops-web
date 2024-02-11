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
    if (!data || !entitySettingInView) return '';

    // TODO: make logic more advanced
    return data
      .map((d) => (d as unknown as any)[entitySettingInView?.propKey])
      .join(',');
  }, [data, entitySettingInView]);

  return (
    <>
      <Modal show={openModal} onClose={onClose}>
        <Modal.Header>
          <div>Example Data</div>
        </Modal.Header>
        <Modal.Body>
          {isFetching && <div>Loading...</div>}
          {(!data || data.length === 0) && !isFetching && (
            <div>
              Seems like {dependency?.entity || ' dependent entity'} has not
              been synced yet
            </div>
          )}
          {data && !!data.length && !isFetching && (
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
              <div className="text-smnpm mt-6">
                If you want to see more examples, please go to the{' '}
                <strong>Data Management</strong> for more advanced querying.
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
