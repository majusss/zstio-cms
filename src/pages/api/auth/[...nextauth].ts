import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import prisma from "@/lib/db";
import { Adapter } from "next-auth/adapters";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
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
    signIn: async ({ user }) => {
      if (!user?.email) return false;
      return (
        (await prisma.access.findMany({ where: { email: user?.email } }))
          .length > 0
      );
    },
  },
});
