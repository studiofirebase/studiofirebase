import { NextResponse } from 'next/server';

export async function POST() {
  // Rota descontinuada: SMS é enviado via Firebase Phone Auth no cliente
  return NextResponse.json({
    success: false,
    message: 'Rota descontinuada. Use Firebase Phone Auth no cliente.'
  }, { status: 410 });
}