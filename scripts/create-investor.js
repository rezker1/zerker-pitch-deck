const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createInvestor(email, name, role = 'PROSPECT_INVESTOR', options = {}) {
  try {
    const {
      company,
      investmentRound,
      accessLevel = 'TIER_1',
      notes
    } = options;

    console.log(`Creating investor account for: ${email}`);

    const investor = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        role,
        company: company || null,
        investmentRound: investmentRound || null,
        accessLevel,
        notes: notes || null
      },
      create: {
        email,
        name,
        role,
        company: company || null,
        investmentRound: investmentRound || null,
        accessLevel,
        notes: notes || null
      }
    });

    console.log('✅ Investor account created/updated successfully:');
    console.log(`   📧 Email: ${investor.email}`);
    console.log(`   👤 Name: ${investor.name}`);
    console.log(`   🏷️  Role: ${investor.role}`);
    console.log(`   🏢 Company: ${investor.company || 'Not specified'}`);
    console.log(`   💰 Round: ${investor.investmentRound || 'Not specified'}`);
    console.log(`   🔐 Access: ${investor.accessLevel}`);
    
    console.log('\n🔗 Authentication Options:');
    if (role === 'PROSPECT_INVESTOR') {
      console.log('   - Google OAuth: "Sign in with Google" using this email');
      console.log('   - Magic Link: Enter email on sign-in page to receive login link');
    } else {
      console.log('   - Google OAuth: "Sign in with Google" using this email (RECOMMENDED)');
      console.log('   - Magic Link: Enter email on sign-in page to receive login link');
    }

    return investor;
  } catch (error) {
    console.error('❌ Error creating investor:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// CLI usage
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node create-investor.js <email> <name> [role] [options]');
  console.log('');
  console.log('Examples:');
  console.log('  node create-investor.js "investor@fund.com" "John Smith"');
  console.log('  node create-investor.js "investor@fund.com" "John Smith" "EXISTING_INVESTOR"');
  console.log('  node create-investor.js "investor@fund.com" "John Smith" "BOARD_MEMBER" --company="Acme Ventures" --round="Series A"');
  console.log('');
  console.log('Roles: PROSPECT_INVESTOR, EXISTING_INVESTOR, BOARD_MEMBER, PARTNER, ADMIN');
  console.log('Access Levels: TIER_1, TIER_2, TIER_3, TIER_4');
  process.exit(1);
}

const [email, name, role = 'PROSPECT_INVESTOR'] = args;

// Parse additional options
const options = {};
args.forEach(arg => {
  if (arg.startsWith('--company=')) options.company = arg.split('=')[1];
  if (arg.startsWith('--round=')) options.investmentRound = arg.split('=')[1];
  if (arg.startsWith('--access=')) options.accessLevel = arg.split('=')[1];
  if (arg.startsWith('--notes=')) options.notes = arg.split('=')[1];
});

if (email && name) {
  createInvestor(email, name, role, options);
}