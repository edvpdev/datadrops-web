import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const searchParams = request.nextUrl.searchParams;
    const providerKey = searchParams.get('provider');

    if (!providerKey) {
      return NextResponse.error();
    }

    const response = await agent.Entities.deleteAllData(
      {
        id: currentUser.id!,
        type: currentUser.status!
      },
      providerKey
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};
