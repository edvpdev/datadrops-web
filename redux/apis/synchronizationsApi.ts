import { ICreateSynchronizationPayload, ISynchronization } from '@/lib/types';
import { baseApi } from './baseApi';
import { setSyncs } from 'redux/slices/synchronizationsSlice';

export const synchronizationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSynchronizations: builder.query<ISynchronization[], string>({
      query: (providers) => `/synchronizations?providers=${providers}`,
      async onQueryStarted(x, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        dispatch(setSyncs(data));
      },
      providesTags: (result) =>
        result
          ? [{ type: 'Synchronizations', id: 'LIST' }]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Synchronizations', id: 'LIST' }]
    }),
    runSynchronization: builder.mutation<
      ISynchronization,
      ICreateSynchronizationPayload
    >({
      query: (body: ICreateSynchronizationPayload) => {
        return {
          url: `/synchronizations`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [{ type: 'Synchronizations', id: 'LIST' }]
    }),
    deleteSynchronization: builder.mutation<void, string>({
      query: (synchronizationId: string) => ({
        url: `/synchronizations/${synchronizationId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Synchronizations', id: 'LIST' }]
    })
  }),
  overrideExisting: false
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSynchronizationsQuery,
  useRunSynchronizationMutation,
  useDeleteSynchronizationMutation
} = synchronizationsApi;
