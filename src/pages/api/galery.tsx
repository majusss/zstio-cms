/**
 * @swagger
 * /api/galery:
 *   get:
 *     summary: Get gallery settings and images
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
 *                 galery:
 *                   type: object
 *                   properties:
 *                     show:
 *                       type: boolean
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           deleteHash:
 *                             type: string
 *                           url:
 *                             type: string
 *                           shown:
 *                             type: boolean
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Update gallery settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showGalery:
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
