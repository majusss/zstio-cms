import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

export default function MessagesHandler() {
  return (
    <div className="text-white bg-red-500">
      <h1>messages</h1>
    </div>
  );
}
