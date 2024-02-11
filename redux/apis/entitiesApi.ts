import {
  AggregatedResultsWithPagination,
  GmailLabel,
  ITemplate
} from '@/lib/types';
import { baseApi } from './baseApi';

interface BaseQueryProps {
  limit: number;
}

interface GetEntitiesPropsOnly {
  providerId: string;
  entityLabel: string;
}

interface GetAggregatedDataProps {
  entryCollection: string;
  templateKey: string;
  page: number;
}

type GetEntitiesProps = GetEntitiesPropsOnly & BaseQueryProps;

export const entitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEntitiesMinified: builder.query<object[], GetEntitiesProps>({
      query: (props: GetEntitiesProps) =>
        `/entities/mini/${props.providerId}/${props.entityLabel}?limit=${props.limit}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(
                () =>
                  ({
                    type: 'Entities',
                    id: `${arg.entityLabel}_${arg.providerId}`
                  }) as const
              ),
              { type: 'Entities', id: 'LIST' }
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Entities', id: 'LIST' }]
    }),
    getTemplates: builder.query<ITemplate[], GetEntitiesPropsOnly>({
      query: (props: GetEntitiesProps) =>
        `/entities/templates/${props.providerId}/${props.entityLabel}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(
                () =>
                  ({
                    type: 'Templates',
                    id: `${arg.entityLabel}_${arg.providerId}`
                  }) as const
              ),
              { type: 'Templates', id: 'LIST' }
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Templates', id: 'LIST' }]
    }),
    getAggregatedResults: builder.query<
      AggregatedResultsWithPagination<any>,
      GetAggregatedDataProps
    >({
      query: (props: GetAggregatedDataProps) =>
        `/entities/aggregation/${props.entryCollection}/${props.templateKey}?page=${props.page}`,
      providesTags: (result, error, arg) =>
        result
          ? [{ type: 'Aggregation', id: `${arg.templateKey}_page_${arg.page}` }]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Aggregation', id: `${arg.templateKey}_page_${arg.page}` }]
    })
  }),
  overrideExisting: false
});

const {
  useGetEntitiesMinifiedQuery,
  useGetTemplatesQuery,
  useLazyGetAggregatedResultsQuery
} = entitiesApi;

function useGetEntitiesQueryWithType<T = object>(
  queryData: GetEntitiesProps,
  { skip = false }
) {
  const result = useGetEntitiesMinifiedQuery(queryData, {
    skip
  });

  if (
    queryData.providerId === 'gmail' &&
    queryData.entityLabel === 'gmail-labels'
  ) {
    return {
      ...result,
      data: result.data as GmailLabel[] | undefined
    };
  }
  return {
    ...result,
    data: result.data as T[] | undefined
  };
}

export {
  useGetEntitiesQueryWithType,
  useGetTemplatesQuery,
  useLazyGetAggregatedResultsQuery
};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetEntitiesQuery } = entitiesApi;
