import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!user || !passwordMatch) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
