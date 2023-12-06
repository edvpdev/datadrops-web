'use client';

import { IProvider } from '@/lib/types';
import { createSelector } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useGetProvidersQuery } from 'redux/apis/providersApi';
import { useGetSynchronizationsQuery } from 'redux/apis/synchronizationsApi';
import { RootState } from 'redux/store';

export default function IntegrationsWrapper({
  children
}: {
  children: ReactNode;
}) {
  const selectActiveProviders = createSelector(
    (state: RootState) => state.userProviders.data,
    (userProviders: IProvider[]) => userProviders.map((p) => p.key)
  );
  const activeProviders = useSelector(selectActiveProviders);

  console.log(activeProviders);
  const {
    data: synchronizations,
    isLoading: syncsLoading,
    isSuccess: syncsSuccess,
    isError: syncsError
  } = useGetSynchronizationsQuery(activeProviders.join(','));
  const {
    data: providers,
    isLoading: providersLoading,
    isSuccess: providersSuccess,
    isError: providersError
  } = useGetProvidersQuery();

  if (syncsLoading || providersLoading) {
    return <div className="p-12">Loading...</div>;
  }

  if (syncsError || providersError) {
    return <div className="p-12">Error</div>;
  }

  if (providersSuccess || syncsSuccess) {
    return <div className="p-12">{children}</div>;
  }
}
