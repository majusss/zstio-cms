import React from "react";
import Layout from "@/components/Layout";
import { authentication } from "@/utils/authentication";
import SettingsHandler from "@/components/Settings/SettingsHandler";

export default function Tv() {
  return (
    <Layout>
      <SettingsHandler />
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
