import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    console.log('Debug auth endpoint called for:', email);
    
    // Test database connection
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true
      }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found in database',
        email
      });
    }

    if (!user.password) {
      return NextResponse.json({
        success: false,
        message: 'User has no password set',
        user: { email: user.email, name: user.name }
      });
    }

    // Test password
    const isValid = await bcrypt.compare(password, user.password);

    return NextResponse.json({
      success: true,
      userFound: true,
      hasPassword: true,
      passwordValid: isValid,
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Debug auth error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

