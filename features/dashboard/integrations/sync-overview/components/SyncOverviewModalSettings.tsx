'use client';

import { SyncsSettingsForm } from '@/components/form';
import {
  DependencySettingWithHelpButton,
  IProviderEntity,
  IProviderEntityDepSettings,
  IProviderEntityDependency
} from '@/lib/types';
import React, { useCallback } from 'react';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
// import SyncOverviewSettingsHelpModal from './SynchronizationSettingsHelpModal';
import { RootState } from 'redux/store';
import SyncOverviewSettingsHelpModal from './SyncOverviewSettingsHelpModal';

interface SyncOverviewSettingsProps {
  entity: IProviderEntity;
  readonly: boolean;
}

// eslint-disable-next-line react/display-name
const SyncOverviewSettings = React.forwardRef<any, SyncOverviewSettingsProps>(
  (props, ref) => {
    const { entity, readonly } = props;
    const [openModal, setOpenModal] = useState(false);
    const [entitySettingInView, setEntitySettingInView] = useState<
      IProviderEntityDepSettings | undefined
    >(undefined);
    const [dependencySettingsInView, setDependencySettingsInView] = useState<
      IProviderEntityDependency | undefined
    >(undefined);

    const entities = useSelector((state: RootState) => state.userEntities.data);

    let generalSettingsSchema: IProviderEntityDepSettings[] = [
      {
        id: 'overwrite',
        propKey: 'overwrite',
        label: 'Overwrite',
        type: 'boolean',
        required: false,
        // pattern: '^[0-9]+$',
        // placeholder: 'E.g. CHAT,SENT,Label123',
        // errorText: 'Please enter a valid label ID',
        disabled: true,
        isChecked: true,
        tip: 'All previously synced entities will be overwritten'
      },
      {
        id: 'limit',
        propKey: 'limit',
        label: 'Limit',
        type: 'boolean',
        required: false,
        // pattern: '^[0-9]+$',
        // placeholder: 'E.g. CHAT,SENT,Label123',
        // errorText: 'Please enter a valid label ID',
        disabled: true,
        isChecked: entity.multi,
        tip: 'Only the first 50 entities will be synced for standard users and 500 for pro users. For more accurate limitations refer to documentation.'
      },
      {
        id: 'multi',
        propKey: 'multi',
        label: 'Many',
        type: 'boolean',
        required: false,
        // pattern: '^[0-9]+$',
        // placeholder: 'E.g. CHAT,SENT,Label123',
        // errorText: 'Please enter a valid label ID',
        disabled: true,
        isChecked: entity.multi || false,
        tip: 'Indicates that there can be more than one entity'
      }
    ];

    const HelpButton = ({
      settings,
      dependency
    }: {
      settings: IProviderEntityDepSettings;
      dependency: IProviderEntityDependency;
    }): React.ReactNode => (
      <button
        className="btn btn-md h-[42px] min-h-[42px]"
        onClick={() => {
          setOpenModal(true);
          setEntitySettingInView(settings);
          setDependencySettingsInView(dependency);
        }}>
        Help
      </button>
    );

    const depSettingsWithHelpButton = useMemo(() => {
      if (!entity.dependsOn || !entities) return [];

      return entity.dependsOn
        .map((dependency): DependencySettingWithHelpButton | null => {
          const foundEntity = entities.find(
            (ent) => ent.id === dependency.entity
          );
          if (!foundEntity) return null;

          const { depSettings } = foundEntity || [];
          const foundSettings = depSettings.find((settings) => {
            return settings.propKey === dependency.depSettingsId;
          });
          if (!foundSettings) return null;

          return {
            ...foundSettings,
            id: foundEntity.id,
            helpButton: () =>
              !readonly
                ? HelpButton({ settings: foundSettings, dependency })
                : undefined
          };
        })
        .filter((dep) => !!dep) as DependencySettingWithHelpButton[];
    }, [entity.dependsOn, entities, readonly]);

    generalSettingsSchema = generalSettingsSchema.map((setting) => ({
      ...setting,
      helpButton: undefined
    })) as DependencySettingWithHelpButton[];

    const closeFn = useCallback(() => {
      setOpenModal(false);
      setEntitySettingInView(undefined);
      setDependencySettingsInView(undefined);
    }, []);

    return (
      <>
        <SyncOverviewSettingsHelpModal
          openModal={openModal}
          entitySettingInView={entitySettingInView}
          dependency={dependencySettingsInView}
          onClose={closeFn}
        />
        <SyncsSettingsForm
          generalDepSettings={generalSettingsSchema}
          entityDepSettings={depSettingsWithHelpButton}
          readonly={readonly}
          ref={ref}></SyncsSettingsForm>
      </>
    );
  }
);

export default SyncOverviewSettings;
