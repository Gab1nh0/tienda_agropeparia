import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout exitoso' });
  response.cookies.delete('token');
  return response;
}