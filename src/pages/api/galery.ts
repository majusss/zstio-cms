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
 *                     galery:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/File'
 *       500:
 *         description: Internal server error
 */
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const galery = await prisma.galery.findMany();
        return res.status(200).json({
          success: true,
          galery,
        });
      } catch (error) {
        return res.status(500).json({ success: false, galery: {}, error });
      }
  }
}
