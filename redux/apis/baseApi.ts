// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: () => ({}),
  tagTypes: [
    'Providers',
    'Synchronizations',
    'Entities',
    'Templates',
    'Aggregation',
    'Views',
    'View',
    'JnataQueries'
  ],
  reducerPath: 'api'
});
