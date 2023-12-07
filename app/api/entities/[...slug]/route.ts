import { customLog } from '@/actions/customLog.action';
import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { withAxiom } from 'next-axiom';
import { NextRequest, NextResponse } from 'next/server';

interface EntitiesRouteProps {
  params: {
    slug: [string, string, string];
  };
}

export const GET = async (
  request: NextRequest,
  { params }: EntitiesRouteProps
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const { slug } = params;
    const [path, provider, entityLabel] = slug;

    switch (path) {
      case 'mini':
        const response = await agent.Entities.getEntitiesMinified(
          {
            id: currentUser.id!
          },
          provider,
          entityLabel,
          '5'
        );
        return NextResponse.json(response);
    }
    return NextResponse.json([]);
  } catch (error) {
    customLog.error('Error in POST /api/synchronizations', error as any);
    return NextResponse.error();
  }
};
