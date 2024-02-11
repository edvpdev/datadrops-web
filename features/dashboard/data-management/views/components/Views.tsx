'use client';

import { useGetViewsQuery } from 'redux/apis/viewsApi';
import ViewsList from './ViewsList';
import { IView } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import View from './View';
import { TemplateFilters } from '../../query/components/TemplatesFilterBox';

interface ViewsProps {
  filters: TemplateFilters;
}

export default function Views({ filters }: ViewsProps) {
  // receives filter value for fetching the data, results passed to template list, or maybe all values passed to list
  const { data: views } = useGetViewsQuery(
    {
      providerId: filters.provider.value,
      entityLabel: filters.entity.value
    },
    {
      skip: !filters.provider.value || !filters.entity.value
    }
  );
  const [selectedView, setView] = useState<IView | undefined>(undefined);

  const setViewHandler = useCallback((view: IView) => {
    setView(view);
  }, []);

  // in order to update selected view when it is updated
  useEffect(() => {
    if (!views) return;
    if (selectedView) {
      const foundView = views.find((view) => view._id === selectedView._id);
      if (!foundView) {
        setView(undefined);
      } else {
        setView(foundView);
      }
    }
  }, [views]);

  return (
    <div className="flex h-full rounded-b bg-gray-50">
      <ViewsList views={views} selectViewFn={setViewHandler} />
      <View selectedView={selectedView} />
    </div>
  );
}
