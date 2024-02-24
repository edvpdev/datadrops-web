import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { IJnataQueryCreatePayload } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const response = await agent.JnataQueries.getAllJnataQueries({
      id: currentUser.id!,
      type: currentUser.status!
    });
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

    const response = await agent.JnataQueries.createJnataQuery(
      {
        id: currentUser.id!,
        type: currentUser.status!
      },
      body as IJnataQueryCreatePayload
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};
