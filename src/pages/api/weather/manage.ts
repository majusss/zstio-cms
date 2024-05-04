/**
 * @swagger
 * /api/weather/manage:
 *   get:
 *     summary: Get weather settings
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
 *                 weather:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     show:
 *                       type: boolean
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Update weather settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showWeather:
 *                 type: boolean
 *               weatherApi:
 *                 type: string
 *     responses:
 *       200:
 *         description: Weather settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 weather:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     show:
 *                       type: boolean
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *   default:
 *     summary: Method not allowed
 *     responses:
 *       405:
 *         description: Method not allowed
 */
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ weather: {}, error: "Unauthorized" });
        }
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
    default:
      return res.status(405).end();
  }
}
