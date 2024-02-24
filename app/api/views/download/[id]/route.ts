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

    const response = await agent.Views.getAggregatedViewDataFile(
      {
        id: currentUser.id!,
        type: currentUser.status!
      },
      viewId
    );
    const str = JSON.stringify(response);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
      type: 'application/json;charset=utf-8'
    });
    const headers = new Headers();
    // remember to change the filename here
    headers.append('Content-Disposition', 'attachment; filename="test.json"');
    headers.append('Content-Type', 'application/json');

    return new Response(blob, {
      headers
    });
  } catch (error) {
    return NextResponse.error();
  }
};
