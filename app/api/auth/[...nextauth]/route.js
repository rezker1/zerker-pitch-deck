import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';

const authOptions = {
  adapter: PrismaAdapter(prisma),
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
    // Magic link authentication
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // Magic links valid for 24 hours
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log('NextAuth signIn callback:', { email: user?.email, provider: account?.provider });
      
      // Allow credentials provider (password auth)
      if (account?.provider === 'credentials') {
        return true;
      }
      
      // For email provider (magic link), check if user is authorized
      if (account?.provider === 'email') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        });
        
        if (existingUser) {
          console.log('✅ Allowing magic link sign-in for pre-approved user:', user.email);
          return true;
        } else {
          console.log('❌ Blocking sign-in - email not in authorized list:', user.email);
          return false;
        }
      }
      
      return true;
    },
    async jwt({ token, user, account }) {
      // On sign in, add user data to token
      if (user) {
        console.log('NextAuth JWT callback - initial sign in, adding user data');
        
        // For credentials provider, user data is already complete
        if (account?.provider === 'credentials') {
          token.id = user.id;
          token.role = user.role;
          token.company = user.company;
          token.accessLevel = user.accessLevel;
          token.investmentRound = user.investmentRound;
        } else {
          // For email provider, fetch user data from database
          try {
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email },
              select: { 
                id: true, 
                role: true, 
                company: true, 
                accessLevel: true,
                investmentRound: true 
              }
            });
            
            if (dbUser) {
              token.id = dbUser.id;
              token.role = dbUser.role;
              token.company = dbUser.company;
              token.accessLevel = dbUser.accessLevel;
              token.investmentRound = dbUser.investmentRound;
            }
          } catch (error) {
            console.error('Error fetching user in JWT callback:', error);
          }
        }
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