'use client';

import { ITemplate } from '@/lib/types';
import { useCallback, useContext } from 'react';
import { QueryWrapperContext } from '..';

interface TemplatesListProps {
  templates: ITemplate[] | undefined;
}

export default function TemplatesList({ templates }: TemplatesListProps) {
  const queryWrapperCtx = useContext(QueryWrapperContext);
  const selectTemplateFn = queryWrapperCtx?.pages[0].selectTemplateFn;

  const selectTemplate = useCallback(
    (template: ITemplate) => {
      selectTemplateFn(template);
    },
    [selectTemplateFn]
  );

  return (
    <div className="w-[250px] overflow-y-auto border-r-2 px-4 py-6">
      {!templates && (
        <div className="flex h-full items-center justify-center">
          {/* <span className="loading loading-spinner loading-md bg-gray-400"></span>
           */}
          No Filters selected
        </div>
      )}
      {templates?.map((template) => (
        <div
          key={template._id}
          onClick={() => selectTemplate(template)}
          className="mb-4 cursor-pointer whitespace-nowrap rounded hover:bg-gray-100">
          <span className="p-2">{template.title}</span>
        </div>
      ))}
    </div>
  );
}
