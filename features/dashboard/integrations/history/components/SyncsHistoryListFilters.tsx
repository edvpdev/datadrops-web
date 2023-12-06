'use client';

import { memo, useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import FiltersBox, { Filters } from './FilterBox';
import { ISynchronization } from '@/lib/types';
import { isEqual } from 'lodash';

interface SyncsHistoryListFiltersProps {
  syncs: ISynchronization[];
  setSyncs: React.Dispatch<React.SetStateAction<ISynchronization[]>>;
}

const filteredSyncs = (syncs: ISynchronization[], filters: Filters) => {
  const filterByStatus = (sync: ISynchronization) => {
    return filters.status.value
      ? sync.status.toLowerCase() === filters.status.value.toLowerCase()
      : true;
  };
  const filterByProvider = (sync: ISynchronization) => {
    return filters.provider.value
      ? sync.providerId.toLowerCase() === filters.provider.value.toLowerCase()
      : true;
  };
  const filterByEntity = (sync: ISynchronization) => {
    return filters.entity.value
      ? sync.entityLabel.toLowerCase() === filters.entity.value.toLowerCase()
      : true;
  };

  return [...syncs].filter(
    (sync) =>
      filterByStatus(sync) && filterByProvider(sync) && filterByEntity(sync)
  );
};

const SyncsHistoryListFilters = memo(function SyncsHistoryListFilters({
  syncs,
  setSyncs
}: SyncsHistoryListFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    provider: { value: '', label: '' },
    entity: { value: '', label: '' },
    status: { value: '', label: '' }
  });

  useEffect(() => {
    const newSyncs = filteredSyncs(syncs, filters);
    console.log(newSyncs);
    setSyncs(newSyncs);
  }, [filters, syncs, setSyncs]);

  return (
    <div className="mb-8 rounded-md bg-gray-50">
      <div className="flex flex-row justify-between p-4">
        Filters
        <button onClick={() => setFiltersOpen((prevState) => !prevState)}>
          {filtersOpen ? <FiMinus /> : <FiPlus />}
        </button>
      </div>
      {filtersOpen && (
        <FiltersBox
          filters={filters}
          onFiltersChange={(e) =>
            setFilters((prevState) => ({
              ...prevState,
              ...e
            }))
          }
        />
      )}
    </div>
  );
}, isEqual);

export default SyncsHistoryListFilters;
