import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth-utils';
import { getNewAccessToken } from './services/auth/auth.service';
import { deleteCookie, getCookie } from './services/auth/tokenHandlers';

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const hasTokenRefreshedParam = request.nextUrl.searchParams.has('tokenRefreshed');
    const authPath = ["/","/about", "/contact", "/faq", "/features", "/signup"];

    if (hasTokenRefreshedParam) {
        const url = request.nextUrl.clone();
        url.searchParams.delete('tokenRefreshed');
        return NextResponse.redirect(url);
    }

    const tokenRefreshResult = await getNewAccessToken();

    if (tokenRefreshResult?.tokenRefreshed) {
        const url = request.nextUrl.clone();
        url.searchParams.set('tokenRefreshed', 'true');
        return NextResponse.redirect(url);
    }

    const accessToken = await getCookie("accessToken") || null;

    let userRole: UserRole | null = null;
    // Allow public (authPath) pages without checks
    if (authPath.includes(pathname)) {
        if(pathname == "/signup" && accessToken){
            const loginUrl = new URL("/", request.url);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }
    // If the path is NOT a public or auth page, and user isn't logged in, clear all tokens and redirect
    if (pathname !== "/login" && !accessToken) {
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
        await deleteCookie("userRole");
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Get user role from cookie (set during login)
    const roleFromCookie = await getCookie("userRole");
    userRole = roleFromCookie as UserRole;

    const routerOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // Rule 1: User is logged in and trying to access auth route. Redirect to default dashboard
    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    }

    if (routerOwner === null) {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (routerOwner === "COMMON") {
        return NextResponse.next();
    }

    if (routerOwner === "SUPER_ADMIN" || routerOwner === "AGENT" || routerOwner === "USER") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}