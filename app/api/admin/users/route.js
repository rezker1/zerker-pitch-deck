import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET - Fetch all users (Admin only)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        company: true,
        investmentRound: true,
        accessLevel: true,
        notes: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new user (Admin only)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('Admin API - Session check:', {
      hasSession: !!session,
      userRole: session?.user?.role,
      userEmail: session?.user?.email
    });
    
    if (!session || session.user?.role !== 'ADMIN') {
      console.log('Admin API - Authorization failed:', {
        session: !!session,
        role: session?.user?.role
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { email, name, role, company, investmentRound, accessLevel, notes } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role: role || 'PROSPECT_INVESTOR',
        company: company || null,
        investmentRound: investmentRound || null,
        accessLevel: accessLevel || 'TIER_1',
        notes: notes || null
      }
    });

    return NextResponse.json({ 
      message: 'User created successfully', 
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}