import prisma from "@/utils/db";
import axios from "axios";
import * as cheerio from "cheerio";
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
        const request = await axios.get("https://zstiojar.edu.pl/aktualnosci/");
        const $ = cheerio.load(request.data);
        const articles: { title: string; content: string; img: string }[] = [];

        $("#main")
          .find("article")
          .each((i, el) => {
            const title = $(el).find("h2").first().text() || "";
            const content = $(el).find("p").first().text() || "";
            const img = $(el).find("img").first().attr("src") || "";
            articles.push({ title, content, img });
          });
        return res.status(200).json({
          success: true,
          news: { articles, show: settings?.showNews },
        });
      } catch (error) {
        return res.status(500).json({ success: false, news: {}, error });
      }
      break;
    case "POST":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ news: {}, error: "Unauthorized" });
        }

        if (!("showNews" in req.body))
          return res.status(400).json({ news: {}, error: "Bad Request" });

        await prisma.settings.updateMany({
          data: {
            showNews: !!req.body.showNews,
          },
        });

        return res.status(200).json({
          success: true,
        });
      } catch (error) {
        return res.status(500).json({ success: false, news: {}, error });
      }
      break;

    default:
      return res.status(405).end();
  }
}
