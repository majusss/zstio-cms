import Layout from "@/components/Layout";
import MessagesHandler from "@/components/Messages/MessagesHandler";
import { authentication } from "@/lib/authentication";

export default function Messages() {
  return (
    <Layout>
      <MessagesHandler />
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
