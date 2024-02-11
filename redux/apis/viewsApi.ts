import {
  AggregatedResultsWithPagination,
  IView,
  IViewCreatePayload,
  IViewUpdatePayload
} from '@/lib/types';
import { baseApi } from './baseApi';

interface GetViewsProps {
  providerId: string;
  entityLabel: string;
}

export const viewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getViews: builder.query<IView[], GetViewsProps>({
      query: (props: GetViewsProps) =>
        `/views?providerId=${props.providerId}&entityLabel=${props.entityLabel}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Views', id: _id }) as const),
              { type: 'Views', id: 'LIST' }
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Views', id: 'LIST' }]
    }),
    getViewAggregatedData: builder.query<
      AggregatedResultsWithPagination<any>,
      { viewId: string; page: number }
    >({
      query: (props: { viewId: string; page: number }) =>
        `/views/aggregate/${props.viewId}?page=${props.page}`,
      providesTags: (result, error, arg) =>
        result
          ? [{ type: 'View', id: `${arg.viewId}_page_${arg.page}` }]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'View', id: `${arg.viewId}_page_${arg.page}` }]
    }),
    getViewAggregatedJSONFile: builder.mutation<any, string>({
      query: (viewId: string) => {
        return {
          url: `/views/download/${viewId}`,
          method: 'GET',
          responseType: 'blob',
          responseHandler: async (response) => {
            const blob = await response.blob();
            const file = new File([blob], `view_${viewId}.json`, {
              type: 'application/json'
            });
            var hiddenElement = document.createElement('a');
            var url = window.URL || window.webkitURL;
            var blobPDF = url.createObjectURL(file);
            hiddenElement.href = blobPDF;
            hiddenElement.target = '_blank';
            hiddenElement.download = `view_${viewId}.json`;
            hiddenElement.click();
            return { data: null };
          },
          cache: 'no-cache'
        };
      }
    }),
    createView: builder.mutation<IView, Omit<IViewCreatePayload, 'userId'>>({
      query: (view: IViewCreatePayload) => ({
        url: `/views`,
        method: 'POST',
        body: view
      }),
      invalidatesTags: [{ type: 'Views', id: 'LIST' }]
    }),
    updateView: builder.mutation<
      IView,
      { body: IViewUpdatePayload; viewId: string }
    >({
      query: (payload: { body: IViewUpdatePayload; viewId: string }) => ({
        url: `/views/${payload.viewId}`,
        method: 'PUT',
        body: payload.body
      }),
      invalidatesTags: [{ type: 'Views', id: 'LIST' }]
    }),
    deleteView: builder.mutation<string, string>({
      query: (viewId: string) => ({
        url: `/views/${viewId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Views', id: 'LIST' }]
    })
  }),
  overrideExisting: false
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetViewsQuery,
  useCreateViewMutation,
  useUpdateViewMutation,
  useDeleteViewMutation,
  useGetViewAggregatedDataQuery,
  useLazyGetViewAggregatedDataQuery,
  useGetViewAggregatedJSONFileMutation
} = viewsApi;
