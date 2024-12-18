import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith("/api")) {
    return;
  }

  if (isLoggedIn) {
    if (nextUrl.pathname === "/sign-in") {
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }

  if (nextUrl.pathname !== "/sign-in") {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
