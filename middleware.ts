import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from './src/service/auth/tokenHandler';

// Protected routes that require authentication
const protectedRoutes = [
    '/admin',
    '/host',
    '/user',
    '/my-profile',
    '/settings',
];

const authRoutes = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get('accessToken')?.value;

    // Check if it's a protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if it's an auth route
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // If accessing protected route without token, redirect to login
    if (isProtectedRoute && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If accessing auth routes with token, redirect to default dashboard
    if (isAuthRoute && accessToken) {
        return NextResponse.redirect(new URL('/user/dashboard', request.url));
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
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};
