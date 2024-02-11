import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (request: NextRequest) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const response = await agent.Accounts.deleteAccount({
      id: currentUser.id!
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
};
