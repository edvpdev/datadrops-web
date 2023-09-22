import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { parse } from "./lib/middleware/utils";
import { APP_HOSTNAMES, isHomeHostname } from "./lib/constants";
import { HomeMiddleware, authMiddleware } from "./lib/middleware";
import AppMiddleware from "./lib/middleware/app";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_proxy/|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path, key } = parse(req);
  console.log("middleware", domain, path, key, req.url);
  console.log(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  );
  console.log("CLERK_SECRET_KEY", process.env.CLERK_SECRET_KEY);
  console.log("NODE_ENV", process.env.NODE_ENV);

  // for App
  if (APP_HOSTNAMES.has(domain)) {
    console.log("isAppHost", domain, path, key, req.url);
    return authMiddleware(req, ev);
  }

  // for root pages (e.g. dub.co, vercel.fyi, etc.)
  if (isHomeHostname(domain)) {
    console.log("isRoot", domain, path, key, req.url);
    return HomeMiddleware(req);
  }

  return NextResponse.rewrite(new URL(`${path === "/" ? "" : path}`, req.url));
}
