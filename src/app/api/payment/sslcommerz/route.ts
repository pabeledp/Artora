import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, totalBDT, customerName, phone, email, method } = body;

    // Simulate SSLCommerz Session Initiation
    // In production, this issues an HTTPS POST request to https://sandbox.sslcommerz.com/gwprocess/v4/api.php
    // with store_id, store_passwd, total_amount, currency='BDT', tran_id, success_url, fail_url, etc.
    const sessionData = {
      status: 'SUCCESS',
      gatewayUrl: `https://sandbox.sslcommerz.com/gwprocess/v4/simulator?tran_id=${orderNumber}&method=${method}`,
      sessionkey: `SSL_SESSION_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      tran_id: orderNumber,
      amount: totalBDT,
      currency: 'BDT',
      method: method || 'bKash',
      mockSuccess: true,
    };

    return NextResponse.json(sessionData);
  } catch (error: any) {
    console.error('SSLCommerz initiation error:', error);
    return NextResponse.json(
      { error: 'SSLCommerz session creation failed', details: error.message },
      { status: 500 }
    );
  }
}
