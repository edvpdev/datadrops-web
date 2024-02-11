'use client';

import { useGetTemplatesQuery } from 'redux/apis/entitiesApi';
import TemplateDescription from './TemplateDescription';
import { TemplateFilters } from './TemplatesFilterBox';
import TemplatesList from './TemplatesList';

interface TemplatesProps {
  filters: TemplateFilters;
}

export default function Templates({ filters }: TemplatesProps) {
  // receives filter value for fetching the data, results passed to template list, or maybe all values passed to list
  const { data: templates } = useGetTemplatesQuery(
    {
      providerId: filters.provider.value,
      entityLabel: filters.entity.value
    },
    {
      skip: !filters.provider.value || !filters.entity.value
    }
  );

  return (
    <div className="flex basis-[300px] rounded bg-gray-50 lg:basis-1/2">
      <TemplatesList templates={templates} />
      <TemplateDescription />
    </div>
  );
}
