const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUsers() {
  try {
    console.log('Creating pre-defined user accounts...');

    // Create prospect investor
    const prospectUser = await prisma.user.upsert({
      where: { email: 'alfzotsky@gmail.com' },
      update: {
        role: 'PROSPECT_INVESTOR',
        company: 'Prospect Investor',
        accessLevel: 'TIER_1',
        notes: 'Prospect investor - limited access to basic materials only'
      },
      create: {
        email: 'alfzotsky@gmail.com',
        name: 'Alex Zotsky',
        role: 'PROSPECT_INVESTOR',
        company: 'Prospect Investor',
        accessLevel: 'TIER_1',
        investmentRound: null,
        notes: 'Prospect investor - limited access to basic materials only'
      }
    });

    // Create existing investor / board member
    const existingUser = await prisma.user.upsert({
      where: { email: 'revaz@treeship.dev' },
      update: {
        role: 'BOARD_MEMBER',
        company: 'TreeShip Development',
        accessLevel: 'TIER_4',
        investmentRound: 'Series A',
        notes: 'Board member with full access to all materials and admin features'
      },
      create: {
        email: 'revaz@treeship.dev',
        name: 'Revaz TreeShip',
        role: 'BOARD_MEMBER',
        company: 'TreeShip Development',
        accessLevel: 'TIER_4',
        investmentRound: 'Series A',
        notes: 'Board member with full access to all materials and admin features'
      }
    });

    // Make yourself an admin
    const adminUser = await prisma.user.upsert({
      where: { email: 'revaz@zerker.ai' },
      update: {
        role: 'ADMIN',
        company: 'ZERKER',
        accessLevel: 'TIER_4',
        notes: 'System administrator with full control'
      },
      create: {
        email: 'revaz@zerker.ai',
        name: 'Revaz',
        role: 'ADMIN',
        company: 'ZERKER',
        accessLevel: 'TIER_4',
        notes: 'System administrator with full control'
      }
    });

    console.log('✅ Users created successfully:');
    console.log(`📧 Prospect: ${prospectUser.email} - ${prospectUser.role}`);
    console.log(`📧 Board Member: ${existingUser.email} - ${existingUser.role}`);
    console.log(`📧 Admin: ${adminUser.email} - ${adminUser.role}`);
    
    console.log('\n🔐 Access Summary:');
    console.log('Prospect (alfzotsky@gmail.com): Basic deck + Executive summary only');
    console.log('Board Member (revaz@treeship.dev): Full access to all materials');
    console.log('Admin: Full system access + user management');

  } catch (error) {
    console.error('❌ Error creating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsers();