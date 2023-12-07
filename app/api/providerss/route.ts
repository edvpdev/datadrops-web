import { customLog } from '@/actions/customLog.action';
import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { AxiomRequest, withAxiom } from 'next-axiom';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  // try {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const response = await agent.Providers.getAllProviders({
    id: currentUser.id!
  });
  return NextResponse.json(response);
  // return NextResponse.json([]);
  // } catch (error) {
  //   customLog.error('Error in POST /api/providers', error as any);
  //   return NextResponse.error();
  // }
};
