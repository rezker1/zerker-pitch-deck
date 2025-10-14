const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkPasswords() {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
        password: true
      }
    });

    console.log('Password Status for All Users:\n');
    
    const withPassword = [];
    const withoutPassword = [];
    
    users.forEach(user => {
      if (user.password) {
        withPassword.push(user);
        console.log(`✅ ${user.email} (${user.role}) - HAS PASSWORD`);
      } else {
        withoutPassword.push(user);
        console.log(`❌ ${user.email} (${user.role}) - NO PASSWORD (magic link only)`);
      }
    });
    
    console.log('\n📊 Summary:');
    console.log(`- Users with passwords: ${withPassword.length}`);
    console.log(`- Users without passwords: ${withoutPassword.length}`);
    console.log('\nUsers without passwords can only sign in via:');
    console.log('- Magic Link (email)');
    console.log('- Google OAuth (if using Gmail)');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPasswords();