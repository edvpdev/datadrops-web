import { baseApi } from './baseApi';

export const accountsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAccount: builder.mutation<void, void>({
      query: () => ({
        url: `/accounts`,
        method: 'DELETE'
      }),
      invalidatesTags: [
        { type: 'Providers', id: 'LIST' },
        { type: 'Synchronizations', id: 'LIST' }
      ]
    }),
    deleteAccountData: builder.mutation<void, void>({
      query: () => ({
        url: `/accounts/data`,
        method: 'DELETE'
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
export const { useDeleteAccountMutation, useDeleteAccountDataMutation } =
  accountsApi;
