'use client';

import TemplatesFiltersBox, { TemplateFilters } from './TemplatesFilterBox';
import { useCallback, useEffect, useState } from 'react';
import QueryWrapperNavbar from './QueryNavBar';
import Templates from './Templates';
import QueryPreview from './QueryPreview';
import { QueryWrapperContext } from '..';
import { ITemplate, JSONValue } from '@/lib/types';
import { useLazyGetAggregatedResultsQuery } from 'redux/apis/entitiesApi';
import TransformationView from './TransformationView';
import { Toasty } from '@/lib/components';
import toast from 'react-hot-toast';

export default function QueryWrapper() {
  const [queryTrigger, { data, error, isLoading }] =
    useLazyGetAggregatedResultsQuery({});
  // For Templates & Transformation views
  const [selectedPage, setPage] = useState(0);
  const [selectedTemplate, setTemplate] = useState<ITemplate | undefined>(
    undefined
  );
  const [queryOptions, setQueryOptions] = useState({
    limit: 0,
    sort: '',
    projection: ''
  });
  const [queryResults, setResults] = useState<{
    results: JSONValue;
    count: number;
  }>({ results: [], count: 0 });
  const [queryResultsPage, setResultsPage] = useState<number>(1);
  const [filters, setFilters] = useState<TemplateFilters>({
    provider: { value: '', label: '' },
    entity: { value: '', label: '' }
  });

  // For Templates & Transformation views
  const setPageFn = useCallback((page: number) => {
    setPage(page);
  }, []);

  const runQuery = useCallback(async () => {
    if (!selectedTemplate) return;

    await queryTrigger({
      templateKey: selectedTemplate?.templateKey,
      entryCollection: selectedTemplate?.entryCollection,
      page: queryResultsPage
    })
      .then((res) => {
        if (res.data) {
          setResults(res.data);
        }
      })
      .catch((err) => {
        toast.custom((t) => (
          <Toasty
            t={t}
            type="error"
            message="There was an error fetching the data"
          />
        ));
      });
  }, [selectedTemplate, queryTrigger, queryResultsPage]);

  useEffect(() => {
    runQuery();
  }, [queryResultsPage, runQuery]);

  const changeResultsPageFn = useCallback(
    async (page: number) => {
      if (isLoading) return;
      setResultsPage(page);
      // await runQuery();
    },
    [setResultsPage, isLoading]
  );

  // const applyOptions = useCallback(() => {
  //   runQuery();
  // }, [runQuery]);

  const selectTemplate = useCallback((template: ITemplate) => {
    setTemplate(template);
    setResults({ results: [], count: 0 });
  }, []);

  return (
    <QueryWrapperContext.Provider
      value={{
        step: selectedPage,
        pages: [
          {
            selectedTemplate,
            options: { ...queryOptions },
            results: queryResults,
            resultsPage: queryResultsPage,
            changeResultsPageFn: (page: number) => changeResultsPageFn(page),
            runQueryFn: () => runQuery(),
            applyOptionsFn: () => {},
            selectTemplateFn: (template: ITemplate) => selectTemplate(template)
          },
          {}
        ]
      }}>
      <QueryWrapperNavbar setPage={setPageFn} />
      <div className="flex h-full flex-grow flex-col gap-8 overflow-hidden">
        {selectedPage === 0 && (
          <>
            <TemplatesFiltersBox
              filters={filters}
              onFiltersChange={(e) =>
                setFilters((prevState) => ({
                  ...prevState,
                  ...e
                }))
              }
            />
            <div className="flex h-full flex-grow flex-col gap-4 overflow-hidden lg:flex-row">
              <Templates filters={filters} />
              {/* <div className="h-10"></div> */}
              {/* <QueryOptions /> */}
              <QueryPreview />
            </div>
          </>
        )}
        {selectedPage === 1 && <TransformationView />}
      </div>
    </QueryWrapperContext.Provider>
  );
}
