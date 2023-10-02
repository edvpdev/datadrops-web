import { SafeProvider } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const response: SafeProvider[] = [
    {
      title: 'Google',
      id: 'google',
      description: 'Enable to work with your emails and labels',
      isBlocked: false,
      entities: [
        {
          title: 'Gmail Labels',
          id: 'gmail-labels'
        },
        {
          title: 'Gmail Emails',
          id: 'gmail-emails'
        }
      ]
    },
    {
      title: 'Github',
      id: 'github',
      description: 'Enable to work with your emails and labels',
      isBlocked: false,
      entities: [
        {
          title: 'Repositories',
          id: 'gh-repositories'
        },
        {
          title: 'Organizations',
          id: 'gh-organizations'
        }
      ]
    }
  ];
  return NextResponse.json(response);
}
