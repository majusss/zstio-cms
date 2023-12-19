import { getSession } from "next-auth/react";
import React from "react";
import MessagesHandler from "@/components/MessagesHandler";
import { redirect } from "next/navigation";

export default function Start() {
  const session = getSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="w-screen h-screen bg-black">
      <MessagesHandler />
    </div>
  );
}
