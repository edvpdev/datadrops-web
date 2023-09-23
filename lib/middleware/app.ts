import { NextFetchEvent, NextResponse } from 'next/server';
import { parse } from './utils';

import {
  NextRequestWithAuth,
  withAuth
} from 'next-auth/middleware';

async function authMiddleware(
  req: NextRequestWithAuth,
  ev: NextFetchEvent
) {
  const { path, domain, referrer } = parse(req);
  console.log('afterAuth', req.url, referrer);
  if (!req.nextauth.token) {
    console.log('here5', path);
    if (path !== '/sign-in' && path !== '/sign-up') {
      return NextResponse.redirect(
        new URL(`/sign-in`, req.url)
      );
    }
    return NextResponse.rewrite(
      new URL(`/app/sign-in`, req.url)
    );
  } else {
    console.log('here2', path);
    if (path === '/sign-up' || path === '/sign-in') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.rewrite(
      new URL(
        `/app${
          path === '/' ? '/integrations/providers' : path
        }`,
        req.url
      )
    );
  }
}

export default withAuth(authMiddleware, {
  pages: {
    signIn: '/app/sign-in'
  }
});
