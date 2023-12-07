import { NextRequest, NextResponse } from 'next/server';
import { parse } from './utils';

export default async function HomeMiddleware(req: NextRequest) {
  const { domain, path } = parse(req);
  // console.log("HomeMiddleware", domain, path);
  if (!domain) {
    return NextResponse.next();
  }

  // console.log("here3");
  return NextResponse.rewrite(new URL(`/home`, req.url));
}
