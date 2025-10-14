const { PrismaClient } = require('@prisma/client');
const sqlite3 = require('better-sqlite3');

// Use better-sqlite3 to read from SQLite directly
const sqliteDb = sqlite3('./prisma/dev.db');

// PostgreSQL client (new database from Vercel)
// Uses POSTGRES_POSTGRES_PRISMA_URL from environment
const postgresClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_POSTGRES_PRISMA_URL
    }
  }
});

async function migrateData() {
  try {
    console.log('🔄 Starting migration from SQLite to PostgreSQL...\n');

    // Get all users from SQLite using better-sqlite3
    const users = sqliteDb.prepare('SELECT * FROM User').all();

    console.log(`📊 Found ${users.length} users to migrate\n`);

    // Migrate each user
    for (const user of users) {
      console.log(`👤 Migrating user: ${user.email}`);
      
      try {
        // Create user in PostgreSQL
        await postgresClient.user.create({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
            image: user.image,
            role: user.role,
            password: user.password,
            investmentRound: user.investmentRound,
            accessLevel: user.accessLevel,
            company: user.company,
            investmentAmount: user.investmentAmount,
            notes: user.notes,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt)
          }
        });
        console.log(`   ✅ User ${user.email} migrated successfully`);
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`   ⚠️  User ${user.email} already exists in PostgreSQL, skipping`);
        } else {
          console.error(`   ❌ Error migrating user ${user.email}:`, error.message);
        }
      }
    }

    console.log('\n✅ Migration completed successfully!');
    console.log(`\n📈 Summary: ${users.length} users processed`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    sqliteDb.close();
    await postgresClient.$disconnect();
  }
}

migrateData();

