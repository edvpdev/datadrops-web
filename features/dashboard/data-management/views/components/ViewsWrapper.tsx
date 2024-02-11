'use client';

import { useState } from 'react';
import TemplatesFiltersBox, {
  TemplateFilters
} from '../../query/components/TemplatesFilterBox';
import Views from './Views';

export default function ViewsWrapper() {
  const [filters, setFilters] = useState<TemplateFilters>({
    provider: { value: '', label: '' },
    entity: { value: '', label: '' }
  });
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex justify-between">
        <TemplatesFiltersBox
          filters={filters}
          onFiltersChange={(e) =>
            setFilters((prevState) => ({
              ...prevState,
              ...e
            }))
          }
        />
      </div>
      <div className="flex h-full flex-col overflow-hidden">
        <Views filters={filters} />
      </div>
    </div>
  );
}
