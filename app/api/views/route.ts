import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { IViewCreatePayload } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const searchParams = request.nextUrl.searchParams;
    const providerId = searchParams.get('providerId') || '';
    const entityLabel = searchParams.get('entityLabel') || '';

    const response = await agent.Views.getAllViews(
      {
        id: currentUser.id!,
        type: currentUser.status!
      },
      providerId,
      entityLabel
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

    const response = await agent.Views.createView(
      {
        id: currentUser.id!,
        type: currentUser.status!
      },
      body as IViewCreatePayload
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};
