import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectDB } from '@/app/lib/mongodb';
import { User } from '@/app/models/User';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E-posta', type: 'text' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error('Tüm alanları doldurun.');
        }

        // Kullanıcıyı bul
        const user = await User.findOne({ email }).lean();

        if (!user) {
          throw new Error('E-posta veya şifre hatalı.');
        }

        // Şifre doğrulama
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          throw new Error('E-posta veya şifre hatalı.');
        }

        return { id: user._id, email: user.email }; // Kullanıcı verisini döndür.
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
