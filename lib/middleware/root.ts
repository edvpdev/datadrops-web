import { NextRequest, NextResponse } from 'next/server';
import { parse } from './utils';

export default async function HomeMiddleware(req: NextRequest) {
  const { domain, path } = parse(req);
  if (!domain) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(`/home`, req.url));
}
