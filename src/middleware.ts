import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/profile'];
const authRoutes = ['/login'];

export async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const sessionCookies = getSessionCookie(req);

    const isLoggedin = !!sessionCookies;
    const isOnProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));
    const isOnAuthRoute = authRoutes.some((route) => nextUrl.pathname.startsWith(route));

    if (isOnProtectedRoute && !isLoggedin) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isOnAuthRoute && isLoggedin) {
        return NextResponse.redirect(new URL('/profile', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
