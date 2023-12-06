import { User } from '@prisma/client';
import { ISynchronization } from './synchronization.types';

export interface IEntity<T = object> {
  _id: string;
  userId: User['id'];
  syncId: ISynchronization['_id'];
  providerId: string;
  entityLabel: string;
  data: T;
}

export type LeanGmailMessage = {
  id: string;
  labelIds: string[];
  subject: string;
  fromEmail: string;
  fromName: string;
  date: string;
  text: string;
};

export interface GmailLabel {
  id: string;
  name: string;
  messageListVisibility: 'show' | 'hide';
  labelListVisibility: 'labelShow' | 'labelShowIfUnread' | 'labelHide';
  type: 'system' | 'user';
  messagesTotal?: number;
  messagesUnread?: number;
  threadsTotal?: number;
  threadsUnread?: number;
  color?: {
    textColor: string;
    backgroundColor: string;
  };
}

export function isGmailLabel(data: any): data is GmailLabel[] {
  const { id, name, messageListVisibility, labelListVisibility, type } = data[0];
  return (
    messageListVisibility !== undefined &&
    labelListVisibility !== undefined &&
    type !== undefined
  );
}
