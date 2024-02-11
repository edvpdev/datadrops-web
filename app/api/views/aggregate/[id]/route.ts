import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const viewId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';

    const response = await agent.Views.getAggregatedViewData(
      {
        id: currentUser.id!
      },
      viewId,
      page
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};
