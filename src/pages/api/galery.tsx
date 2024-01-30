import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const settings = await prisma.settings.findFirst();
      const galery = await prisma.galery.findMany();
      return res.status(200).json({
        success: true,
        galery: { show: settings?.showGalery, images: galery },
      });
      break;
    case "POST":
      const sessionPOST = await getServerSession(req, res, {});

      if (!sessionPOST) {
        return res.status(401).json({ hint: {}, error: "Unauthorized" });
      }

      if (!req.body || !("showGalery" in req.body))
        return res.status(400).json({ success: false, error: "Bad request" });

      await prisma.settings.updateMany({
        data: { showGalery: req.body.showGalery },
      });

      return res.status(200).json({ success: true });
      break;
  }
}
