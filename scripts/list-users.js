const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_DATABASE_URL
    }
  }
});

async function listUsers() {
  try {
    console.log('📋 Fetching all authorized users...\n');

    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
        accessLevel: true,
        company: true,
        investmentRound: true,
        createdAt: true
      },
      orderBy: {
        role: 'asc'
      }
    });

    console.log(`✅ Found ${users.length} authorized users:\n`);
    console.log('─'.repeat(100));
    
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.email}`);
      console.log(`   Name: ${user.name || 'Not set'}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Access Level: ${user.accessLevel}`);
      console.log(`   Company: ${user.company || 'Not set'}`);
      console.log(`   Investment Round: ${user.investmentRound || 'Not set'}`);
      console.log(`   Created: ${user.createdAt.toISOString().split('T')[0]}`);
    });

    console.log('\n' + '─'.repeat(100));
    console.log(`\n✨ All ${users.length} users can login with magic link at https://investors.zerker.ai\n`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();

