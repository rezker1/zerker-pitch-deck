require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function syncUsers() {
  // SQLite connection
  const sqlitePrisma = new PrismaClient({
    datasources: {
      db: {
        url: 'file:./prisma/dev.db'
      }
    }
  });

  // Neon connection
  const neonPrisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.NEON_DATABASE_URL || 'postgresql://neondb_owner:npg_CfFNweP94dlH@ep-curly-cloud-adcv9rog-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require'
      }
    }
  });

  const defaultPassword = 'Zerker2025$';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  try {
    console.log('📥 Fetching users from SQLite...');
    const users = await sqlitePrisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
        company: true,
        accessLevel: true,
        investmentRound: true,
        investmentAmount: true,
        notes: true
      }
    });

    console.log(`Found ${users.length} users in SQLite`);

    for (const user of users) {
      console.log(`\n🔄 Processing: ${user.email}`);
      
      // Check if user exists in Neon
      const existingUser = await neonPrisma.user.findUnique({
        where: { email: user.email }
      });

      if (existingUser) {
        // Update existing user
        await neonPrisma.user.update({
          where: { email: user.email },
          data: {
            ...user,
            password: hashedPassword
          }
        });
        console.log(`✅ Updated: ${user.email}`);
      } else {
        // Create new user
        await neonPrisma.user.create({
          data: {
            ...user,
            password: hashedPassword,
            emailVerified: null
          }
        });
        console.log(`✅ Created: ${user.email}`);
      }
    }

    console.log('\n✅ All users synced to Neon!');
    console.log(`Default password: ${defaultPassword}`);

  } catch (error) {
    console.error('❌ Error syncing users:', error);
  } finally {
    await sqlitePrisma.$disconnect();
    await neonPrisma.$disconnect();
  }
}

syncUsers();

