/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get news articles
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 news:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Update news settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showNews:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
import prisma from "@/lib/db";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const request = await axios.get("https://zstiojar.edu.pl/aktualnosci/");
        const $ = cheerio.load(request.data);
        const articles: {
          title: string;
          content: string;
          img: string;
          date: Date;
        }[] = [];

        $("#main")
          .find("article")
          .each((i, el) => {
            const title = $(el).find("h2").first().text() || "";
            const content =
              ((e) => {
                if (e.includes("Czytaj więcej")) {
                  return e.split("Czytaj więcej")[0];
                }
                return e;
              })($(el).find("p").first().text()) || "";
            const img = $(el).find("img").first().attr("src") || "";
            const date = new Date(
              $(el).find("time").first().attr("datetime")?.toString() || "",
            );
            articles.push({ title, content, img, date });
          });
        return res.status(200).json({
          success: true,
          news: articles,
        });
      } catch (error) {
        return res.status(500).json({ success: false, news: [], error });
      }
    case "POST":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ news: [], error: "Unauthorized" });
        }

        if (!("showNews" in req.body))
          return res.status(400).json({ news: [], error: "Bad Request" });

        await prisma.screen.update({
          where: { id: "NEWS" },
          data: {
            show: !!req.body.showNews,
          },
        });

        return res.status(200).json({
          success: true,
        });
      } catch (error) {
        return res.status(500).json({ success: false, news: [], error });
      }
    default:
      return res.status(405).end();
  }
}
