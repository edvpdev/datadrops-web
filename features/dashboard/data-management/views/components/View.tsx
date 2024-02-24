'use client';

import { IView, JSONValue } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import {
  useGetViewAggregatedJSONFileMutation,
  useLazyGetViewAggregatedDataQuery
} from 'redux/apis/viewsApi';
import { PAGINATION_LIMIT } from '../../const';
import toast from 'react-hot-toast';
import { CanUserUse, PaginationWrapper, Toasty } from '@/lib/components';
import ViewUpdateModal from './ViewUpdateModal';
import { cn } from '@/lib/utils';

interface ViewProps {
  selectedView: IView | undefined;
}

export default function View({ selectedView }: ViewProps) {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [aggregatedDataPage, setAggregatedDataPage] = useState(1);
  const [queryTrigger, { data, isSuccess, isLoading }] =
    useLazyGetViewAggregatedDataQuery({});
  const [
    download,
    { data: file, isSuccess: isFileDownloaded, isLoading: isFileDownloading }
  ] = useGetViewAggregatedJSONFileMutation({});
  const [queryResults, setResults] = useState<{
    results: JSONValue;
    count: number;
  }>({ results: [], count: 0 });

  const openUpdateModalHandler = () => {
    setUpdateModalOpen(true);
  };

  const closeUpdateModalHandler = () => {
    setUpdateModalOpen(false);
  };

  const jsonDownloadHandler = useCallback(() => {
    download(selectedView?._id!)
      .then(async (res) => {})
      .catch((err) => {
        toast.custom((t) => (
          <Toasty t={t} type="error" message="Failed fetching view data" />
        ));
      });
  }, [selectedView, download]);

  const runQuery = useCallback(async () => {
    if (!selectedView) return;

    await queryTrigger({
      viewId: selectedView?._id!,
      page: aggregatedDataPage
    })
      .then((res) => {
        if (res.data) {
          setResults(res.data);
        }
      })
      .catch((err) => {
        toast.custom((t) => (
          <Toasty t={t} type="error" message="Failed fetching view data" />
        ));
      });
  }, [selectedView, queryTrigger, aggregatedDataPage]);

  useEffect(() => {
    runQuery();
  }, [aggregatedDataPage, runQuery]);

  const changeResultsPageFn = useCallback(
    async (page: number) => {
      if (isLoading) return;
      setAggregatedDataPage(page);
      // await runQuery();
    },
    [setAggregatedDataPage, isLoading]
  );

  return (
    <div className="flex h-full flex-grow flex-col overflow-hidden px-4 py-6">
      {selectedView && (
        <>
          <ViewUpdateModal
            isOpen={isUpdateModalOpen}
            closeModalFn={closeUpdateModalHandler}
            jsonNataQuery={selectedView.jsonNataQuery}
            description={selectedView.description}
            viewId={selectedView._id!}
          />
          <h1 className="mb-4 text-lg font-bold">{selectedView.title}</h1>
          <div className="mb-4">
            <p>
              <strong>Description</strong>
            </p>
            {selectedView.description}
          </div>
          <div className="mb-4">
            <p>
              <strong>JSONata Query: </strong>
            </p>
            {selectedView.jsonNataQuery}
          </div>
          {isSuccess && (
            <>
              <div className="flex- flex flex-col overflow-hidden">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <strong>Aggregated data</strong>
                  </div>
                  {!!queryResults.count && (
                    <PaginationWrapper
                      page={aggregatedDataPage}
                      changeResultsPageFn={changeResultsPageFn}
                      totalResults={Math.ceil(
                        queryResults.count / PAGINATION_LIMIT
                      )}
                    />
                  )}
                </div>
                <div className="mb-2 flex-grow overflow-y-scroll">
                  <JsonView
                    data={queryResults.results as any[]}
                    shouldExpandNode={allExpanded}
                    style={defaultStyles}
                  />
                </div>
                <div className="flex flex-shrink justify-end gap-2">
                  <button
                    className="btn btn-sm"
                    onClick={() => jsonDownloadHandler()}>
                    .JSON
                  </button>
                  <CanUserUse roles={['pro', 'standard']}>
                    {(canUse) => (
                      <button
                        className={cn(
                          'btn btn-success btn-sm',
                          !canUse && 'btn-disabled cursor-not-allowed'
                        )}
                        onClick={() => openUpdateModalHandler()}>
                        Update
                      </button>
                    )}
                  </CanUserUse>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {!selectedView && (
        <div className="flex flex-grow items-center justify-center">
          View has not been selected.
        </div>
      )}
    </div>
  );
}
