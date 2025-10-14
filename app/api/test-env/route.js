import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasEmailHost: !!process.env.EMAIL_SERVER_HOST,
    hasEmailPort: !!process.env.EMAIL_SERVER_PORT,
    hasEmailUser: !!process.env.EMAIL_SERVER_USER,
    hasEmailPassword: !!process.env.EMAIL_SERVER_PASSWORD,
    hasEmailFrom: !!process.env.EMAIL_FROM,
    hasPostgresUrl: !!process.env.POSTGRES_POSTGRES_PRISMA_URL,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    emailHost: process.env.EMAIL_SERVER_HOST,
    emailPort: process.env.EMAIL_SERVER_PORT,
    emailUser: process.env.EMAIL_SERVER_USER,
    emailFrom: process.env.EMAIL_FROM,
  });
}

