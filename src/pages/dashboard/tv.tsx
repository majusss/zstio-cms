import Layout from "@/components/Layout";
import SettingsHandler from "@/components/Settings/SettingsHandler";
import { authentication } from "@/lib/authentication";

export default function Tv() {
  return (
    <Layout>
      <SettingsHandler />
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  return authentication(context, ({ session }) => {
    return {
      props: {
        session,
      },
    };
  });
};
