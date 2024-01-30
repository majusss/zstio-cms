import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
          weather: {
            token: settings?.weatherApi,
            show: settings?.showWeather,
          },
        });
      } catch (error) {
        return res.status(500).json({ success: false, weather: {}, error });
      }
      break;
    case "POST":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ weather: {}, error: "Unauthorized" });
        }

        if (!("showWeather" in req.body) || !("weatherApi" in req.body))
          return res.status(400).json({ weather: {}, error: "Bad Request" });

        await prisma.settings.updateMany({
          data: {
            weatherApi: "" + req.body.weatherApi,
            showWeather: !!req.body.showWeather,
          },
        });

        const settings = await prisma.settings.findFirst();

        return res.status(200).json({
          success: true,
          weather: {
            token: settings?.weatherApi,
            show: settings?.showWeather,
          },
        });
      } catch (error) {
        return res.status(500).json({ success: false, weather: {}, error });
      }
      break;

    default:
      return res.status(405).end();
  }
}
