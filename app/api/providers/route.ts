import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  console.log('in api/providers/route.ts');
  const response = await agent.Providers.getAllProviders({
    id: currentUser.id!
  });
  return NextResponse.json(response);
}
