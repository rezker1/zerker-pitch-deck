require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Use DATABASE_URL if POSTGRES_DATABASE_URL is not set
if (!process.env.POSTGRES_DATABASE_URL && process.env.DATABASE_URL) {
  process.env.POSTGRES_DATABASE_URL = process.env.DATABASE_URL;
}

const prisma = new PrismaClient();

async function setDefaultPassword() {
  const defaultPassword = 'Zerker2025$';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  console.log('Setting default password for all users...');
  console.log('Default password:', defaultPassword);

  try {
    // Get all users
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true }
    });

    console.log(`Found ${users.length} users`);

    // Update each user with the hashed password
    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      console.log(`✅ Updated password for: ${user.email}`);
    }

    console.log('\n✅ All users updated successfully!');
    console.log(`Default password: ${defaultPassword}`);
  } catch (error) {
    console.error('❌ Error updating passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setDefaultPassword();

