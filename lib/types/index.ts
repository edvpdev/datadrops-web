import { User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'emailVerified' | 'updatedAt'
> & {
  createdAt: string;
  emailVerified: string | null;
  updatedAt: string;
};

export type SafeProviderBase = {
  title: string;
  id: string;
  description: string;
  entities: SyncEntity[];
};

export type SafeProvider = (GoogleProvider | GithubProvider) & {
  isBlocked: boolean; // UI level
};

export interface GoogleProvider extends SafeProviderBase {
  title: 'Google';
  id: 'google';
  description: string;
  entities: SafeGoogleSyncEntity[];
}

export interface GithubProvider extends SafeProviderBase {
  title: 'Github';
  id: 'github';
  description: string;
  entities: SafeGithubSyncEntity[];
}

interface SyncEntity {
  title: string;
  id: string;
}

// GOOGLE ENTITIES
export interface GmailLabelsSyncEntity extends SyncEntity {
  title: 'Gmail Labels';
  id: 'gmail-labels';
}

export interface GmailEmailsSyncEntity extends SyncEntity {
  title: 'Gmail Emails';
  id: 'gmail-emails';
}

export type SafeGoogleSyncEntity =
  | GmailLabelsSyncEntity
  | GmailEmailsSyncEntity;

// GITHUB ENTITIES
export interface GithubRepoSyncEntity extends SyncEntity {
  title: 'Repositories';
  id: 'gh-repositories';
}

export interface GithubOrgSyncEntity extends SyncEntity {
  title: 'Organizations';
  id: 'gh-organizations';
}

export type SafeGithubSyncEntity = GithubRepoSyncEntity | GithubOrgSyncEntity;

// SYNCHRONIZATIONS

export type SafeSyncEntity = SafeGoogleSyncEntity | SafeGithubSyncEntity;

type SyncedEntity = SafeSyncEntity & {
  isLoaded: boolean;
  isLoading: boolean;
};

export type Synchronization = {
  _id: string; // from DB
  providerTitle: SafeProvider['title'];
  providerID: SafeProvider['id'];
  syncedEntities: SyncedEntity[];
};
