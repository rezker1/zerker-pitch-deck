import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Debug logging
    if (pathname === '/') {
      console.log('Middleware - Home page access:', {
        pathname,
        hasToken: !!token,
        role: token?.role,
        email: token?.email
      });
    }

    // Protect specific routes based on user role
    const allowedFinancialRoles = ['CURRENT_INVESTOR', 'BOARD_MEMBER', 'PARTNER', 'ADMIN'];
    if (pathname.startsWith('/financials') && !allowedFinancialRoles.includes(token?.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Protect ZERKER Finance route - Board members and admins only
    const allowedZerkerFinanceRoles = ['BOARD_MEMBER', 'ADMIN'];
    if (pathname.startsWith('/zerker-finance') && !allowedZerkerFinanceRoles.includes(token?.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Debug logging
        if (pathname === '/') {
          console.log('Middleware - Authorization check:', {
            pathname,
            hasToken: !!token,
            role: token?.role,
            returning: !!token
          });
        }

        // Always allow access to auth pages and unauthorized page
        if (pathname.startsWith('/auth/') || pathname === '/unauthorized') {
          return true;
        }

        // Protect main routes - require authentication
        if (pathname.startsWith('/2') || 
            pathname.startsWith('/3') || 
            pathname.startsWith('/deck') ||
            pathname.startsWith('/financials') ||
            pathname.startsWith('/zerker-finance') ||
            pathname.startsWith('/legal') ||
            pathname.startsWith('/one-pagers') ||
            pathname === '/') {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};