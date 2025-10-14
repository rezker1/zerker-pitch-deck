const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updatePassword() {
  try {
    const email = 'revaz@zerker.ai';
    const newPassword = 'Zxczxc123$1990';
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the user
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
      select: {
        email: true,
        name: true,
        role: true
      }
    });
    
    console.log('✅ Password updated successfully!');
    console.log('User:', updatedUser.email);
    console.log('New password:', newPassword);
    console.log('\nYou can now sign in with:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${newPassword}`);
    
  } catch (error) {
    console.error('❌ Error updating password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePassword();

