/**
 * @swagger
 * /api/screen:
 *   get:
 *     summary: Get screens
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
 *                 screens:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Screen'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Update screens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               screens:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Screen'
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
import { Screen, ScreenId } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const screenIds = Object.values(ScreenId);
  for (const id of screenIds) {
    const existingScreen = await prisma.screen.findFirst({
      where: { id },
    });
    if (!existingScreen) {
      await prisma.screen.create({
        data: {
          id,
          index: screenIds.indexOf(id),
        },
      });
    }
  }

  switch (req.method) {
    case "GET":
      try {
        const screens = await prisma.screen.findMany({});
        return res.status(200).json({ success: true, screens });
      } catch (error) {
        return res.status(500).json({ success: false, screens: {}, error });
      }
    case "POST":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ news: {}, error: "Unauthorized" });
        }

        if (req?.body?.screens?.length === 0)
          return res.status(400).json({ success: false, error: "Bad request" });
        await prisma.screen.deleteMany({});
        req.body.screens.forEach(async (screen: Screen) => {
          await prisma.screen.create({
            data: screen,
          });
        });
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, settings: {}, error });
      }
      break;
  }
}
