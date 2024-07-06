import connectMongoDB from "@/libs/database/mongodb";
import Account from "@/models/account";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // login
        await connectMongoDB();
        let findUser = await Account.findOne({ username });
        if (findUser === null) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if (!passwordMatch) {
          return null;
        }

        const tmp = findUser;
        findUser.name = tmp.username;
        return findUser;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, user }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
