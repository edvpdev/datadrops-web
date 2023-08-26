import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default authMiddleware({
  // beforeAuth(req) {
  //   const url = req.nextUrl;

  //   // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  //   //   console.log(process.env);
  //   const hostname = req.headers
  //     .get("host")!
  //     .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  //   // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  //   const path = url.pathname;

  //   // rewrites for app pages
  //   if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
  //     // const session = await getToken({ req });
  //     // if (!session && path !== "/login") {
  //     //   return NextResponse.redirect(new URL("/login", req.url));
  //     // } else if (session && path == "/login") {
  //     //   return NextResponse.redirect(new URL("/", req.url));
  //     // }
  //     return NextResponse.rewrite(
  //       new URL(`/app${path === "/" ? "" : path}`, req.url)
  //     );
  //   }

  //   // rewrite everything else to `/[domain]/[path] dynamic route
  //   return NextResponse.rewrite(
  //     new URL(`${path === "/" ? "" : path}`, req.url)
  //   );
  // },
  // afterAuth(auth, req, evt) {
  //   // handle users who aren't authenticated
  //   if (!auth.userId && !auth.isPublicRoute) {
  //     return redirectToSignIn({ returnBackUrl: req.url });
  //   }
  //   // redirect them to organization selection page
  //   if (
  //     auth.userId &&
  //     !auth.orgId &&
  //     req.nextUrl.pathname !== "/org-selection"
  //   ) {
  //     const orgSelection = new URL("/org-selection", req.url);
  //     return NextResponse.redirect(orgSelection);
  //   }
  // },
  publicRoutes: ["/", "/home"],
});
