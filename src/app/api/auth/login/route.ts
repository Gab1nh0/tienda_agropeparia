import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validar datos
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' } // Token expira en 1 día
    );

    // Configurar la respuesta y establecer la cookie con el token
    const response = NextResponse.json(
      { 
        message: 'Login exitoso',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      },
      { status: 200 }
    );

    // Establecer la cookie con el token
    response.cookies.set('token', token, {
      httpOnly: true, // Solo accesible por el servidor
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      maxAge: 60 * 60 * 24, // 1 día
      path: '/', // Válida para toda la aplicación
    });

    return response;

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}