import { User } from '@prisma/client';
import { IProvider, IProviderEntity } from './provider.types';

export type SynchronizationOverview = {
  entityLabelTitle: IProvider['title'];
} & Pick<ISynchronization, 'providerId' | 'entityLabel'> & {
    currentSyncId: string;
    lastSyncId: string;
    currentSyncStatus: string;
    lastSyncStatus: string;
    currentSyncUpdatedAt: string;
    lastSyncUpdatedAt: string;
  };

export type SynchronizationsOverview = {
  [key in IProvider['key']]: SynchronizationOverview[];
};

export interface ISynchronizationSummary {
  entitiesSynced: number;
  errMessage: string;
  jobId: number | null;
  timeElapsed?: number;
}

export interface ISynchronizationGeneralSettings {
  limit: boolean;
  overwrite: boolean;
  multi: boolean;
}

export interface ISynchronizationSettings {
  generalSettings: ISynchronizationGeneralSettings;
  entitySettings: object;
}

export interface ISynchronization {
  _id: string;
  userId: User['id'];
  providerId: IProvider['key'];
  entityLabel: IProviderEntity['id'];
  prevSyncId: string;
  status: 'started' | 'finished' | 'failed';
  settings: ISynchronizationSettings;
  summary: ISynchronizationSummary;
  updated_at: string;
}

export interface ICreateSynchronizationPayload {
  providerId: IProvider['key'];
  entityLabel: IProviderEntity['id'];
  prevSyncId: string;
  generalSettings: {
    limit?: boolean;
    overwrite: boolean;
  };
  entitySettings: any;
}

export type SyncEntityStatus = IProviderEntity & {
  isLoaded: boolean;
  isLoading: boolean;
};
