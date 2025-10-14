import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    
    // Try to find the specific user
    const user = await prisma.user.findUnique({
      where: { email: 'revaz@zerker.ai' },
      select: {
        email: true,
        name: true,
        role: true,
        password: true
      }
    });
    
    return NextResponse.json({
      success: true,
      userCount,
      hasUser: !!user,
      userHasPassword: !!user?.password,
      userName: user?.name,
      userRole: user?.role
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

