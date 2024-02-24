import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const searchParams = request.nextUrl.searchParams;
    const providers = searchParams.get('providers') || '';
    if (!providers) {
      return NextResponse.json([]);
    }

    const response = await agent.Synchronizations.getAllSynchronizationsForUser(
      {
        id: currentUser.id!,
        type: currentUser.status!
      },
      providers
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();

    const response = await agent.Synchronizations.runSynchronization(
      {
        id: currentUser.id!,
        type: currentUser.status!
      },
      body
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};
