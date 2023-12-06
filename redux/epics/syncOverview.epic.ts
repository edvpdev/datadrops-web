import { IProviderEntity, SynchronizationsOverview } from '@/lib/types';
import { Action } from '@reduxjs/toolkit';
import {
  setUserProviders,
  setSyncs,
  setSyncsOverview,
  setUserEntities
} from 'redux/slices';
import {
  Observable,
  catchError,
  combineLatest,
  filter,
  from,
  map,
  mergeMap,
  of,
  switchMap
} from 'rxjs';

export const syncOverviewEpic = (action$: Observable<Action>) =>
  combineLatest([
    action$.pipe(
      filter(setUserProviders.match),
      map((action) => action)
    ),
    action$.pipe(
      filter(setSyncs.match),
      map((action) => action)
    )
  ]).pipe(
    switchMap(([providers, syncs]) => {
      console.log('in epic');
      console.log('providers', providers);
      console.log('syncs', syncs);
      const syncsOverview: SynchronizationsOverview = {};
      // sort syncs by updated_at
      const sortedSyncs = [...syncs.payload].sort((a, b) => {
        if (a.updated_at < b.updated_at) return 1;
        if (a.updated_at > b.updated_at) return -1;
        return 0;
      });

      const allEntities: IProviderEntity[] = [];

      providers.payload.forEach((provider) => {
        syncsOverview[provider.title] = provider.entities.map((entity) => {
          const currentSyncForEntity = sortedSyncs.find(
            (sync) =>
              sync.entityLabel === entity.id && sync.status === 'started'
          );
          const lastFinishedSyncForEntity = sortedSyncs.find(
            (sync) =>
              sync.entityLabel === entity.id &&
              (sync.status === 'finished' || sync.status === 'failed')
          );

          allEntities.push(entity);

          return {
            entityLabelTitle: entity.title,
            entityLabel: entity.id,
            currentSyncId: currentSyncForEntity?._id || '',
            lastSyncId: lastFinishedSyncForEntity?._id || '',
            currentSyncStatus: currentSyncForEntity?.status || '',
            lastSyncStatus: lastFinishedSyncForEntity?.status || '',
            currentSyncUpdatedAt: currentSyncForEntity?.updated_at || '',
            lastSyncUpdatedAt: lastFinishedSyncForEntity?.updated_at || '',
            providerId: provider.key
          };
        });
      });
      return from('x').pipe(
        mergeMap(() =>
          of(setSyncsOverview(syncsOverview), setUserEntities(allEntities))
        )
      );
    })
    // catchError((error: any) => {
    //   console.log('error', error);
    // })
  );
