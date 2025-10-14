const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_POSTGRES_PRISMA_URL
    }
  }
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Using URL:', process.env.POSTGRES_POSTGRES_PRISMA_URL ? 'Set ✓' : 'NOT SET ✗');
    
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT current_database(), current_user`;
    console.log('✅ Database connection successful!');
    console.log('Connection info:', result);
    
    // Check if users table exists and get count
    const userCount = await prisma.user.count();
    console.log(`\n✅ Users table accessible. Found ${userCount} users.`);
    
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
    
    if (user) {
      console.log('\n✅ User revaz@zerker.ai found in database:');
      console.log('  - Name:', user.name);
      console.log('  - Role:', user.role);
      console.log('  - Has password:', user.password ? 'YES' : 'NO');
    } else {
      console.log('\n❌ User revaz@zerker.ai NOT found in database!');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

