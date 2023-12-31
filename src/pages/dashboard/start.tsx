import React from "react";
import Layout from "@/components/Layout";
import { authentication } from "@/utils/authentication";

export default function Start() {
  return (
    <Layout>
      <></>
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
