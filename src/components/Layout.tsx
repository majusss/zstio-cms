import { getSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = getSession();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="min-h-screen bg-[#010101]">
      <Sidebar />
      {children}
    </div>
  );
}
