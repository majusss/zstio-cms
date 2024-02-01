import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const authentication = async (
  context: any,
  cb: ({ session }: { session: Session }) => void,
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

  return cb({ session });
};
