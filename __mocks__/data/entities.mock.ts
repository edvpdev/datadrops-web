import { IEntity } from '@/lib/types';

export const mockEntities: IEntity[] = [
  {
    _id: '1',
    userId: '1',
    providerId: 'google',
    entityLabel: 'gmail-labels',
    syncId: '1',
    data: [
      {
        id: 'CATEGORY_PERSONAL',
        name: 'Personal',
        messageListVisibility: 'show',
        labelListVisibility: 'labelShow',
        type: 'system'
      },
      {
        id: 'CATEGORY_SOCIAL',
        name: 'Social',
        messageListVisibility: 'show',
        labelListVisibility: 'labelShow',
        type: 'system'
      },
      {
        id: 'CATEGORY_PROMOTIONS',
        name: 'Promotions',
        messageListVisibility: 'show',
        labelListVisibility: 'labelShow',
        type: 'system'
      }
    ]
  }
];
