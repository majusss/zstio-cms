import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";

const Start: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Start page!</h1>
    </div>
  );
};

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

  return {
    props: {},
  };
};

export default Start;
