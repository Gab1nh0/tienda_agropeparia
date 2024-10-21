import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, email, password, role } = await req.json();

    // Validaciones
    if (!username || !email || !password || !role) {
      return NextResponse.json({ 
        message: 'Todos los campos son requeridos' 
      }, { status: 400 });
    }

    // Verificar usuario existente
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ 
        message: 'El usuario o email ya existe' 
      }, { status: 400 });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role
      }
    });

    // Eliminar contraseña de la respuesta
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Usuario registrado exitosamente',
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error('Error al registrar:', error);
    return NextResponse.json({ 
      message: 'Error al registrar usuario' 
    }, { status: 500 });
  }
}