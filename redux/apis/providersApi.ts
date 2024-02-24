import { IProviderWithStatus } from '@/lib/types';
import { baseApi } from './baseApi';
import { setUserProviders } from 'redux/slices';

export const providersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviders: builder.query<IProviderWithStatus[], {}>({
      query: () => `/providerss`,
      async onQueryStarted(x, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        const providersInUse = data
          // .filter((provider) => provider.isBlocked)
          .map((provider) => {
            return {
              key: provider.key,
              title: provider.title,
              description: provider.description,
              _id: provider._id,
              entities: [...provider.entities],
              isBlocked: provider.isBlocked
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
    }),
    deleteAllData: builder.mutation<void, string>({
      query: (providerKey: string) => ({
        url: `/providerss/data?provider=${providerKey}`,
        method: 'POST'
      }),
      invalidatesTags: [
        { type: 'Providers', id: 'LIST' },
        { type: 'Synchronizations', id: 'LIST' }
      ]
    }),
    disconnect: builder.mutation<void, string>({
      query: (providerKey: string) => ({
        url: `/providerss/disconnect?provider=${providerKey}`,
        method: 'POST'
      }),
      invalidatesTags: [
        { type: 'Providers', id: 'LIST' },
        { type: 'Synchronizations', id: 'LIST' }
      ]
    })
  }),
  overrideExisting: false
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProvidersQuery,
  useDeleteAllDataMutation,
  useDisconnectMutation
} = providersApi;
