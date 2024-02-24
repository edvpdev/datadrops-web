import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  // try {
  const currentUser = await getCurrentUser();
  console.log('currentUser', currentUser);
  if (!currentUser) {
    return NextResponse.error();
  }

  const response = await agent.Providers.getAllProviders({
    id: currentUser.id!,
    type: currentUser.status!
  });
  return NextResponse.json(response);
  // return NextResponse.json([]);
  // } catch (error) {
  //   return NextResponse.error();
  // }
};
