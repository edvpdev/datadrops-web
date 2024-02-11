'use client';

import { CustomSelect } from '@/components/form';
import { Label } from 'flowbite-react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveProviders } from 'redux/slices';

export interface TemplateFilters {
  provider: { value: string; label: string };
  entity: { value: string; label: string };
}

interface TemplatesFilterBox {
  filters: TemplateFilters;
  onFiltersChange: (e: Partial<TemplateFilters>) => void;
}

const TemplatesFiltersBox = ({
  filters,
  onFiltersChange
}: TemplatesFilterBox) => {
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
    </div>
  );
};

export default TemplatesFiltersBox;
