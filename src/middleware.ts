import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // Rutas que requieren autenticación
  const authRoutes = ['/dashboard', '/profile', '/admin'];
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (!isAuthRoute) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verificar el token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key'
    );
    await jose.jwtVerify(token.value, secret);
    return NextResponse.next();
  } catch (error) {
    // Token inválido o expirado
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

// Configurar las rutas que usarán el middleware
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*']
}