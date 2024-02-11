'use client';

import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import { QueryWrapperContext } from '..';
import { useContext } from 'react';
import { PAGINATION_LIMIT } from '../../const';
import { PaginationWrapper } from '@/lib/components';

export default function QueryPreview() {
  const queryWrapperCtx = useContext(QueryWrapperContext);
  const results = queryWrapperCtx?.pages[0].results;
  const currentPage = queryWrapperCtx?.pages[0].resultsPage;
  const changeResultsPageFn = queryWrapperCtx?.pages[0].changeResultsPageFn;

  return (
    <div className="flex w-full flex-col overflow-hidden bg-gray-50 px-4 py-6 lg:basis-1/2">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Results</h1>
        {results.count !== 0 && (
          <PaginationWrapper
            page={currentPage}
            changeResultsPageFn={changeResultsPageFn}
            totalResults={Math.ceil(results.count / PAGINATION_LIMIT)}
          />
        )}
      </div>

      {results === null && (
        <div>No results. Please select a template and run the query.</div>
      )}
      {results !== null && (
        <div className="flex-grow overflow-y-scroll">
          <JsonView
            data={results.results as any[]}
            shouldExpandNode={allExpanded}
            style={defaultStyles}
          />
        </div>
      )}
    </div>
  );
}
