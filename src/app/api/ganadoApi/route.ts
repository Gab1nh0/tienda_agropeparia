import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
    try {
        // Obtener todos los animales
        const animals = await prisma.animal.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(animals);
    } catch (error) {
        console.error('Error al obtener animales:', error);
        return NextResponse.json(
            { error: 'Error al procesar la solicitud' }, 
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { className, location, breed, img } = body;

        // Validar datos requeridos
        if (!className || !location || !breed) {
            return NextResponse.json(
                { error: 'Todos los campos son requeridos' }, 
                { status: 400 }
            );
        }

        // Crear nuevo animal
        const animal = await prisma.animal.create({
            data: {
                className,
                location,
                breed,
                img: img || null
            }
        });

        return NextResponse.json(animal, { status: 201 });
    } catch (error) {
        console.error('Error al crear animal:', error);
        return NextResponse.json(
            { error: 'Error al procesar la solicitud' }, 
            { status: 500 }
        );
    }
}