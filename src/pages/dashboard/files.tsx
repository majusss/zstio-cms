import FilesHandler from "@/components/Files/FilesHandler";
import Layout from "@/components/Layout";
import { authentication } from "@/lib/authentication";

export default function Files() {
  return (
    <Layout>
      <FilesHandler />
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
