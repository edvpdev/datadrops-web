'use client';

import { useCallback, useContext } from 'react';
import { QueryWrapperContext } from '..';

export default function TemplateDescription() {
  const queryWrapperCtx = useContext(QueryWrapperContext);
  const selectedTemplate = queryWrapperCtx?.pages[0].selectedTemplate;
  const runQueryFn = queryWrapperCtx?.pages[0].runQueryFn;

  const runQueryHandler = useCallback(() => {
    runQueryFn && runQueryFn();
  }, [runQueryFn]);

  return (
    <div className="flex flex-grow basis-1/2 flex-col px-4 py-6">
      <h1 className="mb-4 text-lg font-bold">Description</h1>
      {selectedTemplate && (
        <>
          <div className="mb-4 flex-grow">{selectedTemplate.description}</div>
          <div className="flex justify-end">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => runQueryHandler()}>
              Run
            </button>
          </div>
        </>
      )}
      {!selectedTemplate && (
        <div className="mb-4 flex-grow">Template has not been selected.</div>
      )}
    </div>
  );
}
