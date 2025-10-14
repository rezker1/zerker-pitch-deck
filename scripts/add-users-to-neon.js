require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

const users = [
  { email: 'alfzotsky@gmail.com', name: 'Alex Zotsky', role: 'PROSPECT_INVESTOR' },
  { email: 'revaz@treeship.dev', name: 'Revaz TreeShip', role: 'BOARD_MEMBER' },
  { email: 'revaz@zerker.ai', name: 'Revaz', role: 'ADMIN' },
  { email: 'investor@example.com', name: 'John Smith', role: 'CURRENT_INVESTOR' },
  { email: 'test@example.com', name: 'Test User', role: 'PROSPECT_INVESTOR' },
  { email: 'revaz.ts@gmail.com', name: 'Revaz Test', role: 'CURRENT_INVESTOR' },
  { email: 'DREAMERS@DREAMERS.DO', name: 'DAN JOHNS', role: 'BOARD_MEMBER' }
];

async function addUsers() {
  const defaultPassword = 'Zerker2025$';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  console.log('Adding users to Neon database...\n');

  for (const userData of users) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (existingUser) {
        await prisma.user.update({
          where: { email: userData.email },
          data: {
            ...userData,
            password: hashedPassword,
            accessLevel: 'TIER_1'
          }
        });
        console.log(`✅ Updated: ${userData.email}`);
      } else {
        await prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
            accessLevel: 'TIER_1',
            emailVerified: null
          }
        });
        console.log(`✅ Created: ${userData.email}`);
      }
    } catch (error) {
      console.error(`❌ Error with ${userData.email}:`, error.message);
    }
  }

  console.log('\n✅ All users synced!');
  console.log(`Default password for all users: ${defaultPassword}`);
  
  await prisma.$disconnect();
}

addUsers();

