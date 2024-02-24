import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
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

    const searchParams = request.nextUrl.searchParams;
    const { slug } = params;
    const [path, provider, entityLabel] = slug;

    if (path === 'mini') {
      let response = await agent.Entities.getEntitiesMinified(
        {
          id: currentUser.id!,
          type: currentUser.status!
        },
        provider,
        entityLabel,
        '5'
      );
      return NextResponse.json(response);
    }

    if (path === 'templates') {
      let response = await agent.Entities.getTemplates(
        {
          id: currentUser.id!,
          type: currentUser.status!
        },
        provider,
        entityLabel
      );
      return NextResponse.json(response);
    }

    if (path === 'aggregation') {
      // actually it is entityLabel and templateKey in this order
      const page = searchParams.get('page') || '1';
      let response = await agent.Entities.getAggregatedData(
        {
          id: currentUser.id!,
          type: currentUser.status!
        },
        provider,
        entityLabel,
        page
      );
      return NextResponse.json(response);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.error();
  }
};
