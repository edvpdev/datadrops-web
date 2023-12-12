import { IProviderWithStatus } from '@/lib/types';

export const mockProviders: IProviderWithStatus[] = [
  {
    _id: '1',
    title: 'Google',
    description: 'description',
    key: 'google',
    entities: [
      {
        title: 'Gmail Labels',
        id: 'gmail-labels',
        description: 'description',
        dependsOn: [],
        depSettings: [
          {
            id: 'labelIds',
            propKey: 'id',
            label: 'Label IDs',
            type: 'text',
            required: true,
            pattern: '^[a-zA-Z0-9]+$',
            placeholder: 'E.g. CHAT,SENT,Label123',
            errorText: 'Please enter a valid label ID',
            disabled: false
          }
        ],
        multi: true
      }
    ],
    isBlocked: false
  }
];
