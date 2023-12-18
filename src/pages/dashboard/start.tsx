import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import MessagesHandler from "@/components/MessagesHandler";
import prisma, { PrismaClient } from "@prisma/client";

export default function start() {
  return (
    <div className="w-screen h-screen bg-black">
      <MessagesHandler />
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const prisma = new PrismaClient();

  return {
    props: {
      messages: await prisma.message.findMany(),
    },
  };
};
