const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_DATABASE_URL
    }
  }
});

async function addUser() {
  try {
    const userData = {
      email: 'gregbassuk@gmail.com',
      name: 'Greg Bassuk',
      role: 'BOARD_MEMBER',
      accessLevel: 'TIER_4',
      company: 'ZDM',
      investmentRound: 'Angel'
    };

    console.log('➕ Adding new user...\n');
    console.log('Email:', userData.email);
    console.log('Name:', userData.name);
    console.log('Role:', userData.role);
    console.log('Company:', userData.company);
    console.log('Investment Round:', userData.investmentRound);
    console.log('Access Level:', userData.accessLevel);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      console.log('\n⚠️  User already exists with this email!');
      console.log('Updating user instead...\n');
      
      const updatedUser = await prisma.user.update({
        where: { email: userData.email },
        data: {
          name: userData.name,
          role: userData.role,
          accessLevel: userData.accessLevel,
          company: userData.company,
          investmentRound: userData.investmentRound
        }
      });
      
      console.log('✅ User updated successfully!');
      return;
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: userData
    });

    console.log('\n✅ User created successfully!');
    console.log(`\n🎉 ${userData.name} can now login at https://investors.zerker.ai with magic link!`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addUser();

