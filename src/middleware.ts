import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Logic: If on Vercel deployment, redirect Root to Admin Dashboard/Login
    // We identify Vercel by checking the hostname
    const hostname = request.headers.get('host') || '';

    // If we are on the Vercel domain and visiting the root page
    if (hostname.includes('vercel.app') && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/',
};
