import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const searchParams = request.nextUrl.searchParams;
  const providers = searchParams.get('providers') || '';
  if (!providers) {
    return NextResponse.json([]);
  }

  console.log(searchParams);
  console.log('in api/synchronizations/route.ts', providers);

  const response = await agent.Synchronizations.getAllSynchronizationsForUser(
    {
      id: currentUser.id!
    },
    providers
  );
  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  console.log(body);

  const response = await agent.Synchronizations.runSynchronization(
    {
      id: currentUser.id!
    },
    body
  );
  return NextResponse.json(response);
}
