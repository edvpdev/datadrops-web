'use client';

import { CustomSelect } from '@/components/form';
import { Label } from 'flowbite-react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveProviders } from 'redux/slices';

export interface Filters {
  provider: { value: string; label: string };
  entity: { value: string; label: string };
  status: { value: string; label: string };
}

interface FilterBox {
  filters: Filters;
  onFiltersChange: (e: Partial<Filters>) => void;
}

const FiltersBox = ({ filters, onFiltersChange }: FilterBox) => {
  const providers = useSelector(selectActiveProviders);
  const selectedProviderEntities = useMemo(() => {
    const filteredProviders = providers.filter(
      (prov) => prov.key === filters.provider.value
    );

    if (filteredProviders.length > 0) {
      return filteredProviders[0].entities.map((entity) => ({
        value: entity.id,
        label: entity.title
      }));
    } else {
      return [];
    }
  }, [filters.provider.value, providers]);

  return (
    <div className="flex w-full flex-row gap-2 bg-gray-100 p-4">
      <div className="w-full">
        <Label>Provider</Label>
        <CustomSelect
          placeholder="Select..."
          name="provider"
          options={[
            ...providers.map((provider) => ({
              value: provider.key,
              label: provider.title
            }))
          ]}
          onChange={(e) => {
            onFiltersChange({ provider: e, entity: { value: '', label: '' } });
          }}
          value={filters.provider}
        />
      </div>
      <div className="w-full">
        <Label>Entity</Label>
        <CustomSelect
          placeholder="Select..."
          name="entity"
          options={[...selectedProviderEntities]}
          onChange={(e) => {
            onFiltersChange({ entity: e });
          }}
          value={filters.entity}
        />
      </div>

      <div className="w-full">
        <Label>Status</Label>
        <CustomSelect
          placeholder="Select..."
          name="status"
          options={['Finished', 'Failed', 'Started'].map((status) => ({
            value: status,
            label: status
          }))}
          onChange={(e) => {
            onFiltersChange({ status: e });
          }}
          value={filters.status}
        />
      </div>
    </div>
  );
};

export default FiltersBox;
