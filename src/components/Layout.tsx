import Head from "next/head";
import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>ZSTiO CMS</title>
      </Head>
      <div className="h-screen overflow-hidden bg-[#010101] flex">
        <Sidebar />
        <div className="overflow-y-scroll w-full">{children}</div>
      </div>
    </>
  );
}
