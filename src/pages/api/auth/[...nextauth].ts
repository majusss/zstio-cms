import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import GitHubProvider from "next-auth/providers/github";
import prisma from "@/utils/db";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "production" ? false : true,
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/",
    error: "/",
  },

  callbacks: {
    signIn: async ({ user }: any) => {
      return user?.authorizated;
    },
  },
});
