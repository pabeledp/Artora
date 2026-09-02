import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, phone, email, desiredDimensions, palette, budgetBDT, description, wallPhotoUrl } = body;

    if (!clientName || !phone) {
      return NextResponse.json(
        { error: 'Client name and phone number are required.' },
        { status: 400 }
      );
    }

    let commissionId = `COM-${Date.now().toString(36).toUpperCase()}`;

    try {
      const commission = await prisma.commissionRequest.create({
        data: {
          clientName,
          phone,
          email: email || '',
          desiredDimensions: desiredDimensions || 'Custom Size',
          palette: palette ? (typeof palette === 'string' ? palette : JSON.stringify(palette)) : 'Custom',
          budgetBDT: Number(budgetBDT) || 0,
          description: description || 'No specific description provided',
          wallPhotoUrl: wallPhotoUrl || null,
          status: 'PENDING',
        },
      });
      commissionId = commission.id;
    } catch (dbErr) {
      console.warn('Database note (safe fallback for serverless):', dbErr);
    }

    const whatsappMessage = encodeURIComponent(
      `🎨 *Artora Bespoke Commission Request*\n\n` +
      `*Client Name:* ${clientName}\n` +
      `*Phone:* ${phone}\n` +
      `*Canvas Size:* ${desiredDimensions || 'Custom'}\n` +
      `*Palette / Theme:* ${palette || 'Custom Palette'}\n` +
      `*Estimated Budget:* ৳${budgetBDT || 'Discuss with Artist'}\n\n` +
      `*Details & Vision:* ${description || 'Custom hand-painted artwork'}\n\n` +
      `Hello Fiha Islam, I have submitted a bespoke commission request and would like to discuss the artwork details.`
    );

    const whatsappUrl = `https://wa.me/8801723722019?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      message: 'Commission request submitted successfully',
      commissionId,
      whatsappUrl,
    });
  } catch (error: any) {
    console.error('Error in commission API:', error);
    return NextResponse.json(
      { error: 'Failed to submit commission request', details: error.message },
      { status: 500 }
    );
  }
}
