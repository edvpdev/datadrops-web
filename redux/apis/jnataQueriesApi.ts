import { IJnataQueryCreatePayload } from '@/lib/types';
import { baseApi } from './baseApi';
import { IJnataQuery } from '@/lib/types';

export const jnataQueriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJnataQueries: builder.query<IJnataQuery[], null>({
      query: () => `/jnata-queries`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ _id }) => ({ type: 'JnataQueries', id: _id }) as const
              ),
              { type: 'JnataQueries', id: 'LIST' }
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'JnataQueries', id: 'LIST' }]
    }),
    createJnataQuery: builder.mutation<
      IJnataQuery,
      Omit<IJnataQueryCreatePayload, 'userId'>
    >({
      query: (jnataQuery: IJnataQueryCreatePayload) => ({
        url: `/jnata-queries`,
        method: 'POST',
        body: jnataQuery
      }),
      invalidatesTags: [{ type: 'JnataQueries', id: 'LIST' }]
    })
  }),
  overrideExisting: false
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetJnataQueriesQuery, useCreateJnataQueryMutation } =
  jnataQueriesApi;
