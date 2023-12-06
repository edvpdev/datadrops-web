import { GmailLabel, IProviderWithStatus, isGmailLabel } from '@/lib/types';
import { baseApi } from './baseApi';
import { IEntity } from '@/lib/types';

interface BaseQueryProps {
  limit: number;
}

type GetEntitiesProps = {
  providerId: string;
  entityLabel: string;
} & BaseQueryProps;

export const entitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEntitiesMinified: builder.query<IEntity['data'][], GetEntitiesProps>({
      query: (props: GetEntitiesProps) =>
        `/entities/mini/${props.providerId}/${props.entityLabel}?limit=${props.limit}`,
      // /${props.entityLabel}
      //   async onQueryStarted(x, { queryFulfilled, dispatch }) {
      //     const { data } = await queryFulfilled;
      //     console.log('onCacheEntryAdded', data);
      //     const providersInUse = data
      //       .filter((provider) => provider.isBlocked)
      //       .map((provider) => {
      //         return {
      //           key: provider.key,
      //           title: provider.title,
      //           description: provider.description,
      //           _id: provider._id,
      //           entities: [...provider.entities]
      //         };
      //       });
      //     dispatch(setUserProviders(providersInUse));
      //   },
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
    })
  }),
  overrideExisting: false
});

const { useGetEntitiesMinifiedQuery } = entitiesApi;

export function useGetEntitiesQueryWithType<T = object>(
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetEntitiesQuery } = entitiesApi;
