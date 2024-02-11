import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { parse } from './utils';
import { getToken } from 'next-auth/jwt';

export default async function authMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  const { path, domain, referrer } = parse(req);
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });
  if (!session) {
    if (path !== '/sign-in' && path !== '/sign-up') {
      return NextResponse.redirect(new URL(`/sign-in`, req.url));
    }
    return NextResponse.rewrite(new URL(`/app/sign-in`, req.url));
  } else {
    if (path === '/sign-up' || path === '/sign-in') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.rewrite(
      new URL(
        `/app${
          path === '/' || path === '/dashboard'
            ? '/dashboard/integrations/providers'
            : path
        }`,
        req.url
      )
    );
  }
}
