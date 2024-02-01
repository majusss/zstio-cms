import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import prisma from "@/lib/db";
import { User } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";

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
    signIn: async ({ user }: User) => {
      return (
        (await prisma.access.findMany({ where: { email: user?.email } }))
          .length > 0
      );
    },
  },
});
