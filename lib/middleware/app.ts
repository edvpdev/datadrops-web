import { NextRequest, NextResponse } from "next/server";
import { parse, removeSubDomain } from "./utils";
import { authMiddleware } from "@clerk/nextjs";
import { HOME_DOMAIN } from "../constants";

// export default function AppMiddleware(req) {
//   return authMiddleware({
//     beforeAuth(req) {},
//     afterAuth(auth, req, evt) {
//       console.log("afterAuth", req.url);
//       const { path } = parse(req);

//       if (!auth.userId) {
//         return NextResponse.redirect(new URL(`/sign-in`, req.url));
//       } else if (auth.userId) {
//         return NextResponse.rewrite(new URL(`/app${path}`, req.url));
//       }

//       // otherwise, rewrite the path to /app
//       return NextResponse.rewrite(new URL(`/app${path}`, req.url));
//     },
//   })();
// }

export default authMiddleware({
  debug: true,
  beforeAuth(req) {},
  afterAuth(auth, req, evt) {
    const { path, domain, referrer } = parse(req);
    console.log("afterAuth", req.url, referrer);
    console.log(domain);
    if (!auth.userId) {
      console.log("here5", path);
      if (path !== "/sign-in" && path !== "/sign-up") {
        return NextResponse.redirect(new URL(`/sign-in`, req.url));
      }
      return NextResponse.rewrite(new URL(`/app/sign-in`, req.url));
    } else if (auth.userId) {
      console.log("here2", path);
      if (path === "/sign-up" || path === "/sign-in") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.rewrite(
        new URL(
          `/app${
            path === "/" || path === "/dashboard"
              ? "/dashboard/integrations/providers"
              : path
          }`,
          req.url
        )
      );
    }

    return NextResponse.redirect(new URL(`sign-in`, req.url));
  },
});
