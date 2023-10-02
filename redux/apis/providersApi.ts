import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
//   import { setAuth } from '../slices';
//   import { RootState } from '../store';
import { SafeProvider } from '@/lib/types';

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/providers'
  // prepareHeaders: (headers, { getState }) => {
  //   const authToken = (getState() as RootState).auth.user?.authToken;
  //   const email = (getState() as RootState).auth.user?.email;

  //   if (authToken) {
  //     headers.set('authorization', `${authToken}`);
  //     headers.set('account_type', `google`);
  //   }

  //   // used for refresh token
  //   if (email) {
  //     headers.set('email', `${email}`);
  //   }

  //   return headers;
  // },
});

//   const baseQueryWithReauth: BaseQueryFn<
//     string | FetchArgs,
//     unknown,
//     FetchBaseQueryError
//   > = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);
//     if (result.error && result.error.status === 401) {
//       // try to get a new token
//       const refreshResult = await baseQuery('/refresh-token', api, extraOptions);
//       if (refreshResult.data) {
//         // store the new token
//         localStorage.setItem(
//           'authToken',
//           (refreshResult.data as IAccount).authToken
//         );
//         api.dispatch(setAuth(refreshResult.data as IAccount));
//         // retry the initial query
//         result = await baseQuery(args, api, extraOptions);
//       } else {
//         // logout
//         localStorage.removeItem('authToken');
//         api.dispatch(setAuth(undefined));
//       }
//     }
//     return result;
//   };

export const providersApi = createApi({
  reducerPath: 'providersApi',
  baseQuery: baseQuery,
  tagTypes: ['Providers'],
  endpoints: (builder) => ({
    getProviders: builder.query<SafeProvider[], void>({
      query: () => `/`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ id }) => ({ type: 'Providers', id: id }) as const
              ),
              { type: 'Providers', id: 'LIST' }
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Providers', id: 'LIST' }]
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProvidersQuery } = providersApi;
