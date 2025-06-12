// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
]);

export default clerkMiddleware(async (auth, req) => {
  console.log("Middleware path:", req.nextUrl.pathname);

  if (!isPublicRoute(req)) {
    await auth().protect(); // will redirect if not signed in
  }
});

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
