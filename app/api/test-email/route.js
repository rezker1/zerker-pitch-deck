import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('Testing email configuration...');
    console.log('EMAIL_SERVER_HOST:', process.env.EMAIL_SERVER_HOST);
    console.log('EMAIL_SERVER_PORT:', process.env.EMAIL_SERVER_PORT);
    console.log('EMAIL_SERVER_USER:', process.env.EMAIL_SERVER_USER);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
    console.log('Has PASSWORD:', !!process.env.EMAIL_SERVER_PASSWORD);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST?.trim(),
      port: parseInt(process.env.EMAIL_SERVER_PORT?.trim() || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER?.trim(),
        pass: process.env.EMAIL_SERVER_PASSWORD?.trim(),
      },
    });

    // Verify connection
    await transporter.verify();

    return NextResponse.json({
      success: true,
      message: 'Email server connection successful',
      config: {
        host: process.env.EMAIL_SERVER_HOST?.trim(),
        port: process.env.EMAIL_SERVER_PORT?.trim(),
        user: process.env.EMAIL_SERVER_USER?.trim(),
        from: process.env.EMAIL_FROM?.trim(),
      }
    });
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

