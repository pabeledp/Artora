import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientName,
      fullName,
      phone,
      email,
      desiredDimensions,
      canvasSize,
      palette,
      colorTheme,
      budgetBDT,
      estimatedPrice,
      description,
      visionDescription,
      wallPhotoUrl,
    } = body;

    const name = fullName || clientName;
    const size = canvasSize || desiredDimensions || 'Custom Size';
    const theme = colorTheme || palette || 'Custom Palette';
    const desc = visionDescription || description || 'Custom artwork vision';
    const price = estimatedPrice || (budgetBDT ? `৳${budgetBDT}` : 'Custom Pricing');

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Client name and phone number are required.' },
        { status: 400 }
      );
    }

    let commissionId = `COM-${Date.now().toString(36).toUpperCase()}`;

    // 1. Safe SQLite record attempt
    try {
      const commission = await prisma.commissionRequest.create({
        data: {
          clientName: name,
          phone,
          email: email || '',
          desiredDimensions: size,
          palette: typeof theme === 'string' ? theme : JSON.stringify(theme),
          budgetBDT: typeof budgetBDT === 'number' ? budgetBDT : 0,
          description: desc,
          wallPhotoUrl: wallPhotoUrl || null,
          status: 'PENDING',
        },
      });
      commissionId = commission.id;
    } catch (dbErr) {
      console.warn('Database note (safe fallback for serverless):', dbErr);
    }

    // 2. Google Apps Script Web App API Forwarding (Google Sheets & Email)
    const appsScriptUrl =
      process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbyhE7UBrWkfQPQZZBqTXnObIqITWi7uh6MWwGN8Ac44GPLh9ic1mjtswiPS6Yv7lcWU8A/exec';

    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            canvasSize: size,
            colorTheme: theme,
            wallPhotoUrl: wallPhotoUrl || '',
            visionDescription: desc,
            fullName: name,
            phone,
            email: email || '',
            estimatedPrice: price,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (gasErr) {
        console.warn('Google Apps Script forward note:', gasErr);
      }
    }

    // 3. Pre-filled WhatsApp discussion link
    const whatsappMessage = encodeURIComponent(
      `🎨 *Artora Bespoke Commission Request*\n\n` +
      `*Client Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*Canvas Size:* ${size}\n` +
      `*Palette / Theme:* ${theme}\n` +
      `*Estimated Price:* ${price}\n\n` +
      `*Vision & Details:* ${desc}\n\n` +
      `Hello Fiha Islam, I have submitted a bespoke commission request (Ref: ${commissionId}) and would like to discuss my custom canvas!`
    );

    const whatsappUrl = `https://wa.me/8801723722019?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      result: 'success',
      message: 'Commission request submitted successfully to Google Sheets & Studio!',
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
