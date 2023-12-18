import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, {});

  if (!session) {
    return res.status(401).json({ messages: [], error: "Unauthorized" });
  }

  await prisma.message.create({ data: { message: "eoeo" } });

  res.status(200).json({ success: true });
}
