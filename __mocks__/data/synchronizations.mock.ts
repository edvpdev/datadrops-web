import { ISynchronization } from '@/lib/types';

export const mockSynchronizations: ISynchronization[] = [
  {
    _id: '1',
    userId: '1',
    providerId: 'google',
    entityLabel: 'gmail-labels',
    status: 'finished',
    settings: {
      generalSettings: {
        limit: false,
        overwrite: false,
        multi: false
      },
      entitySettings: {}
    },
    summary: {
      entitiesSynced: 0,
      errMessage: '',
      jobId: null
    },
    updated_at: new Date().toISOString()
  }
];
