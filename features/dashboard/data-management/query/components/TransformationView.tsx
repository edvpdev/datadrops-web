import { useContext, useState } from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import { QueryWrapperContext } from '..';
import JsonNataEditor from './JsonNataEditor';
import JsonNataResults from './JsonNataResults';
import { PAGINATION_LIMIT } from '../../const';
import { PaginationWrapper } from '@/lib/components';

export default function TransformationView() {
  const queryWrapperCtx = useContext(QueryWrapperContext);
  const results = queryWrapperCtx?.pages[0].results;
  const currentPage = queryWrapperCtx?.pages[0].resultsPage;
  const changeResultsPageFn = queryWrapperCtx?.pages[0].changeResultsPageFn;

  const [jsonNataQuery, setJsonNataQuery] = useState<null | string>(null);

  const jsonNataHandler = (query: string) => {
    if (query === '') {
      setJsonNataQuery(null);
      return;
    }

    setJsonNataQuery(query);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full max-h-full justify-between">
        <div className="flex w-full flex-col bg-gray-50 p-4 lg:basis-1/3">
          <JsonNataEditor setJsonNataQuery={jsonNataHandler} />
        </div>
        <div className="flex w-full flex-col bg-gray-50 p-4 lg:basis-2/3 lg:flex-row lg:gap-4">
          {results === null && (
            <div className="flex items-center justify-center">
              No results. Please select a template and run the query.
            </div>
          )}
          {results !== null && (
            <div className="flex basis-1/2 flex-col overflow-hidden lg:grow">
              <div className="mb-5 flex items-center justify-between">
                <div>Aggregated data</div>
                {results.count !== 0 && (
                  <PaginationWrapper
                    page={currentPage}
                    changeResultsPageFn={changeResultsPageFn}
                    totalResults={Math.ceil(results.count / PAGINATION_LIMIT)}
                  />
                )}
              </div>
              <div className="mb-4 h-full grow basis-1/2 overflow-y-scroll">
                <JsonView
                  data={results.results as any[]}
                  shouldExpandNode={allExpanded}
                  style={defaultStyles}
                />
              </div>
            </div>
          )}
          <div className="basis-1/2 overflow-hidden lg:h-full">
            <JsonNataResults jsonNataQuery={jsonNataQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}
