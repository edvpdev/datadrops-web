import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const response = await agent.Synchronizations.deleteSynchronization(
      {
        id: currentUser.id!,
        type: currentUser.status!
      },
      params.id
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};
