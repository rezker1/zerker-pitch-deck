import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        password: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Test the password
    const isValid = await bcrypt.compare(password, user.password);
    
    // Also generate a new hash to compare format
    const newHash = await bcrypt.hash(password, 10);

    return NextResponse.json({
      success: true,
      passwordValid: isValid,
      storedHashPrefix: user.password?.substring(0, 30),
      storedHashLength: user.password?.length,
      newHashPrefix: newHash.substring(0, 30),
      newHashLength: newHash.length,
      bcryptVersion: bcrypt.getRounds(user.password)
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

