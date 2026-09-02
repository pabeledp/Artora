import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, phone, email, desiredDimensions, palette, budgetBDT, description, wallPhotoUrl } = body;

    if (!clientName || !phone || !email || !desiredDimensions || !budgetBDT) {
      return NextResponse.json(
        { error: 'Missing required commission fields' },
        { status: 400 }
      );
    }

    const commission = await prisma.commissionRequest.create({
      data: {
        clientName,
        phone,
        email,
        desiredDimensions,
        palette: palette ? JSON.stringify(palette) : null,
        budgetBDT: Number(budgetBDT),
        description: description || 'No specific description provided',
        wallPhotoUrl: wallPhotoUrl || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Commission request submitted successfully',
      commissionId: commission.id,
      data: commission,
    });
  } catch (error: any) {
    console.error('Error in commission API:', error);
    return NextResponse.json(
      { error: 'Failed to submit commission request', details: error.message },
      { status: 500 }
    );
  }
}
