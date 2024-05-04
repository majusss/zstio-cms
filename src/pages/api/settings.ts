/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get settings
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
 *                 settings:
 *                   $ref: '#/components/schemas/Settings'
 *
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Update settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Settings'
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
import { Settings } from "@/types/Settings";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // await prisma.settings.create({ data: {} });
  switch (req.method) {
    case "GET":
      try {
        const settingsDB = (await prisma.settings.findFirst({})) || {
          hintText: "",
          showHint: false,
          showSpotify: false,
          showTimer: false,
          showWeather: false,
          showHappyNumber: false,
        };
        const settings: Settings = {
          hintText: settingsDB.hintText,
          showHint: settingsDB.showHint,
          showSpotify: settingsDB.showSpotify,
          showTimer: settingsDB.showTimer,
          showWeather: settingsDB.showWeather,
          showHappyNumber: settingsDB.showHappyNumber,
        };
        return res.status(200).json({ success: true, settings });
      } catch (error) {
        return res.status(500).json({ success: false, settings: {}, error });
      }
    case "POST":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ messages: [], error: "Unauthorized" });
        }

        const settingsDB = (await prisma.settings.findFirst({})) || {
          hintText: "",
          showHint: false,
          showSpotify: false,
          showTimer: false,
          showWeather: false,
          showHappyNumber: false,
        };

        await prisma.settings.updateMany({
          data: {
            showWeather:
              req.body.showWeather != null
                ? req.body.showWeather
                : settingsDB.showWeather,
            hintText:
              req.body.hintText != null
                ? req.body.hintText
                : settingsDB.hintText,
            showHint:
              req.body.showHint != null
                ? req.body.showHint
                : settingsDB.showHint,
            showSpotify:
              req.body.showSpotify != null
                ? req.body.showSpotify
                : settingsDB.showSpotify,
            showTimer:
              req.body.showTimer != null
                ? req.body.showTimer
                : settingsDB.showTimer,
            showHappyNumber:
              req.body.showHappyNumber != null
                ? req.body.showHappyNumber
                : settingsDB.showHappyNumber,
          },
        });
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, settings: {}, error });
      }
      break;
  }
}
