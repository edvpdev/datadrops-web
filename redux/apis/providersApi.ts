import { IProviderWithStatus } from '@/lib/types';
import { baseApi } from './baseApi';
import { setUserProviders } from 'redux/slices';

export const providersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviders: builder.query<IProviderWithStatus[], void>({
      query: () => `/providers`,
      async onQueryStarted(x, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        console.log('onCacheEntryAdded', data);
        const providersInUse = data
          .filter((provider) => provider.isBlocked)
          .map((provider) => {
            return {
              key: provider.key,
              title: provider.title,
              description: provider.description,
              _id: provider._id,
              entities: [...provider.entities]
            };
          });
        dispatch(setUserProviders(providersInUse));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ _id }) => ({ type: 'Providers', id: _id }) as const
              ),
              { type: 'Providers', id: 'LIST' }
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Providers', id: 'LIST' }]
    })
  }),
  overrideExisting: false
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProvidersQuery } = providersApi;
