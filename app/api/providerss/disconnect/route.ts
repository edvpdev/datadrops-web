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

    if (providerKey === 'google' || !providerKey) {
      return NextResponse.error();
    }

    const response = await agent.Providers.disconnect(
      {
        id: currentUser.id!
      },
      providerKey
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};
