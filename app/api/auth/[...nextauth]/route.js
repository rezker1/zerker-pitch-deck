import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Password authentication
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Attempting password sign in for:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing email or password');
          throw new Error('Please enter your email and password');
        }

        // Check if user exists in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
            company: true,
            accessLevel: true,
            investmentRound: true
          }
        });

        if (!user) {
          console.log('❌ Email not found:', credentials.email);
          throw new Error('Invalid email or password');
        }

        // If no password set, use default password
        if (!user.password) {
          const defaultPassword = 'Zerker2025$';
          const passwordMatch = credentials.password === defaultPassword;
          
          if (passwordMatch) {
            // Hash and save the password for next time
            const hashedPassword = await bcrypt.hash(defaultPassword, 10);
            await prisma.user.update({
              where: { id: user.id },
              data: { password: hashedPassword }
            });
            console.log('✅ Sign-in successful with default password (now hashed):', user.email);
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              company: user.company,
              accessLevel: user.accessLevel,
              investmentRound: user.investmentRound
            };
          } else {
            console.log('❌ Invalid default password for:', user.email);
            throw new Error('Invalid email or password');
          }
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        
        if (!passwordMatch) {
          console.log('❌ Invalid password for:', user.email);
          throw new Error('Invalid email or password');
        }

        console.log('✅ Sign-in successful:', user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          company: user.company,
          accessLevel: user.accessLevel,
          investmentRound: user.investmentRound
        };
      }
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user }) {
      console.log('NextAuth signIn callback:', { email: user?.email });
      return true;
    },
    async jwt({ token, user }) {
      // On sign in, add user data to token
      if (user) {
        console.log('NextAuth JWT callback - initial sign in, adding user data');
        token.id = user.id;
        token.role = user.role;
        token.company = user.company;
        token.accessLevel = user.accessLevel;
        token.investmentRound = user.investmentRound;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          company: token.company,
          accessLevel: token.accessLevel,
          investmentRound: token.investmentRound
        },
      };
    },
    async redirect({ url, baseUrl }) {
      console.log('NextAuth redirect callback:', { url, baseUrl });
      // Always redirect to home page after successful sign in
      if (url.includes('/auth/signin') || url === baseUrl + '/auth/signin') {
        return baseUrl + '/';
      }
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl + '/';
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };