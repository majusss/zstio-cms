import { getSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import { redirect } from "next/navigation";
import PrelineScript from "./PrelineScript";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = getSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="h-screen overflow-hidden bg-[#010101] flex">
      <PrelineScript />
      <Sidebar />
      <div className="overflow-y-scroll w-full">{children}</div>
    </div>
  );
}
