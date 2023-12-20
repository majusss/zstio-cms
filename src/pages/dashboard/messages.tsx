import React from "react";
import Layout from "@/components/Layout";
import MessagesHandler from "@/components/Messages/MessagesHandler";
import { authentication } from "@/utils/authentication";

export default function Messages() {
  return (
    <Layout>
      <MessagesHandler />
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  return authentication(context, ({ session }: any) => {
    return {
      props: {
        session,
      },
    };
  });
};
