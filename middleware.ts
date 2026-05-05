import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    const isAuthPage = request.nextUrl.pathname.startsWith('/signin') || 
                      request.nextUrl.pathname.startsWith('/signup');

    if (isAuthPage) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup']
};