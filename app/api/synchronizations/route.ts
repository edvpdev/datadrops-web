import { Synchronization } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const response: Synchronization[] = [
    {
      _id: '1',
      providerID: 'google',
      providerTitle: 'Google',
      syncedEntities: [
        {
          title: 'Gmail Labels',
          id: 'gmail-labels',
          isLoaded: true,
          isLoading: true
        },
        {
          title: 'Gmail Emails',
          id: 'gmail-emails',
          isLoaded: true,
          isLoading: false
        }
      ]
    },
    {
      _id: '2',
      providerID: 'github',
      providerTitle: 'Github',
      syncedEntities: [
        {
          title: 'Repositories',
          id: 'gh-repositories',
          isLoaded: false,
          isLoading: true
        }
      ]
    }
  ];
  return NextResponse.json(response);
}
