const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    console.log('All users in database:');
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - Created: ${user.createdAt}`);
    });

    // Specifically check for the problematic email
    const zerkerUser = await prisma.user.findUnique({
      where: { email: 'revaz@zerker.ai' }
    });

    console.log('\nrevaz@zerker.ai user details:', zerkerUser);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();