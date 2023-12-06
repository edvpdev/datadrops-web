import getCurrentUser from '@/actions/getCurrentUser';
import { agent } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

interface EntitiesRouteProps {
  params: {
    slug: [string, string, string];
  };
}

export async function GET(
  request: NextRequest,
  { params }: EntitiesRouteProps
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { slug } = params;
  const [path, provider, entityLabel] = slug;

  // try {
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
  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.error();
  // }
}
