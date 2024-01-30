import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!(await prisma.settings.findFirst())) {
    await prisma.settings.create({
      data: {
        weatherApi: "",
        showWeather: false,
        hintText: "",
        showHint: false,
        spotifyRefresh: "",
        showSpotify: false,
        showGalery: false,
        showNews: false,
      },
    });
  }
  switch (req.method) {
    case "GET":
      try {
        const settings = await prisma.settings.findFirst();
        return res.status(200).json({
          success: true,
          hint: { text: settings?.hintText, show: settings?.showHint },
        });
      } catch (error) {
        return res.status(500).json({ success: false, hint: {}, error });
      }
      break;
    case "POST":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ hint: {}, error: "Unauthorized" });
        }

        if (!("hintText" in req.body) || !("showHint" in req.body))
          return res.status(400).json({ hint: {}, error: "Bad Request" });

        await prisma.settings.updateMany({
          data: {
            hintText: "" + req.body.hintText,
            showHint: !!req.body.showHint,
          },
        });

        return res.status(200).json({
          success: true,
        });
      } catch (error) {
        return res.status(500).json({ success: false, hint: {}, error });
      }
      break;

    default:
      return res.status(405).end();
  }
}
