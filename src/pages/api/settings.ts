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
 *                   $ref: '#/components/schemas/Message'
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
import Settings from "@/types/Settings";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const settingsGET: Settings = await prisma.settings.findMany({});
      return res.status(200).json({ success: true, settings: settingsGET });
      break;
    case "POST":
      const settingsPOST: Settings = {
        weatherApi: req.body.weatherApi || "",
        showWeather: req.body.showWeather || false,
        hintText: req.body.hintText || "",
        showHint: req.body.showHint || false,
        spotifyRefresh: req.body.spotifyRefresh || "",
        showSpotify: req.body.showSpotify || false,
        showGallery: req.body.showGallery || false,
        showNews: req.body.showNews || false,
      };
      break;
  }
}
