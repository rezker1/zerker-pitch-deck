const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_POSTGRES_PRISMA_URL
    }
  }
});

async function testPassword() {
  try {
    const email = 'revaz@zerker.ai';
    const testPassword = 'Zxczxc123$1990';

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        name: true,
        role: true,
        password: true
      }
    });

    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:');
    console.log('  Email:', user.email);
    console.log('  Name:', user.name);
    console.log('  Role:', user.role);
    console.log('  Has password:', !!user.password);
    console.log('  Password hash (first 20 chars):', user.password?.substring(0, 20));

    const isValid = await bcrypt.compare(testPassword, user.password);
    console.log('\n🔐 Password test result:', isValid ? '✅ VALID' : '❌ INVALID');

    if (!isValid) {
      console.log('\n⚠️  The password does not match! The stored hash might be incorrect.');
      console.log('Let me try to update it...');
      
      const newHash = await bcrypt.hash(testPassword, 10);
      console.log('New hash generated (first 20 chars):', newHash.substring(0, 20));
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPassword();

