import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const publicPaths = ['/', '/login'];
    const isPublicPath = publicPaths.includes(path);

    // Define protected paths (all dashboard routes)
    const isProtectedPath = path.startsWith('/dashboard');

    // Get auth token from cookies
    const token = request.cookies.get('sb-access-token')?.value ||
        request.cookies.get('sb-refresh-token')?.value;

    // Redirect logic
    if (isProtectedPath && !token) {
        // Not authenticated, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isPublicPath && token && path === '/login') {
        // Already authenticated, redirect to dashboard
        // Default to admin dashboard (you can customize this)
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }

    return NextResponse.next();
}

// Configure which routes should be protected
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)',
    ],
};
