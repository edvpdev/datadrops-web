'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { baseApi } from 'redux/apis/baseApi';
import { useGetProvidersQuery } from 'redux/apis/providersApi';
import { useGetSynchronizationsQuery } from 'redux/apis/synchronizationsApi';
import { selectActiveProviders } from 'redux/slices';
import store from 'redux/store';

export default function IntegrationsWrapper({
  children
}: {
  children: ReactNode;
}) {
  const [tempState, setTempState] = useState(0);
  const activeProviders = useSelector(selectActiveProviders);

  const {
    data: synchronizations,
    isLoading: syncsLoading,
    isSuccess: syncsSuccess,
    isError: syncsError
  } = useGetSynchronizationsQuery(activeProviders.map((p) => p.key).join(','));
  const {
    data: providers,
    isLoading: providersLoading,
    isSuccess: providersSuccess,
    isError: providersError
  } = useGetProvidersQuery();

  useEffect(() => {
    if (tempState === 0) return;
    store.dispatch(baseApi.util.resetApiState());
  }, [tempState]);

  if (syncsLoading || providersLoading) {
    return (
      <div
        key={tempState}
        className="flex h-full flex-col items-center justify-center p-12">
        Loading...
      </div>
    );
  }

  if (syncsError || providersError) {
    return (
      <div
        key={tempState}
        className="flex h-full flex-col items-center justify-center gap-2 p-12">
        An error occurred while loading the data. Please try again later.
        <button
          className="btn btn-sm"
          onClick={() => setTempState((key) => key + 1)}>
          Reload
        </button>
      </div>
    );
  }

  if (providersSuccess || syncsSuccess) {
    return (
      // <div className="h-[calc(100%)] min-h-[calc(100%-64px)] p-12">
      <div className="flex h-full flex-col p-12">{children}</div>
    );
  }

  // return (
  //   <div
  //     key={tempState}
  //     className="flex h-full flex-col items-center justify-center gap-2 p-12">
  //     An error occurred while loading the data. Please try again later.
  //     <button
  //       className="btn btn-sm"
  //       onClick={() => setTempState((key) => key + 1)}>
  //       Reload
  //     </button>
  //   </div>
  // );
}
