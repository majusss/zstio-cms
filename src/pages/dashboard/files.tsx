import React from "react";
import Layout from "@/components/Layout";
import { authentication } from "@/utils/authentication";
import FilesHandler from "@/components/Files/FilesHandler";

export default function Files() {
  return (
    <Layout>
      <FilesHandler />
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
