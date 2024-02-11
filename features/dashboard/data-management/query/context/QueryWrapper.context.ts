import { ITemplate, JSONValue } from '@/lib/types';
import React from 'react';

interface TemplatesPageProps {
  selectedTemplate: ITemplate | undefined;
  options: {
    limit: number;
    sort: string;
    projection: string;
  };
  results: {
    results: JSONValue;
    count: number;
  };
  resultsPage: number;
  changeResultsPageFn: (page: number) => void;
  runQueryFn: (() => void) | null;
  applyOptionsFn: ((options: { limit: number }) => void) | null;
  selectTemplateFn: (template: ITemplate) => void;
}

interface QueryingPageProps {}

interface QueryWrapperContextProps {
  step: number;
  pages: [TemplatesPageProps, QueryingPageProps];
}

const QueryWrapperContext = React.createContext<QueryWrapperContextProps>({
  step: 0,
  pages: [
    {
      selectedTemplate: undefined,
      options: {
        limit: 0,
        sort: '',
        projection: ''
      },
      results: {
        results: {},
        count: 0
      },
      resultsPage: 1,
      changeResultsPageFn: (page: number) => {},
      runQueryFn: () => {},
      applyOptionsFn: () => {},
      selectTemplateFn: (template: ITemplate) => {}
    },
    {}
  ]
});

export default QueryWrapperContext;
