import NextAuth, { NextAuthOptions } from "next-auth";
import { authOptions } from "./authOption";

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  teachersId: [string];
  studentsId: [string];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
