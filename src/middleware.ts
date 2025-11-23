import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname
    const path = request.nextUrl.pathname;

    // Get auth token from cookies
    const token = request.cookies.get('sb-access-token')?.value ||
        request.cookies.get('sb-refresh-token')?.value;

    // Protected paths check - redirect to login if not authenticated
    if (path.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Login page - redirect to dashboard if already authenticated
    // This prevents authenticated users from seeing the login page
    if (path === '/login' && token) {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }

    // Allow all other requests to proceed
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
