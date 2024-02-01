/**
 * @swagger
 * /api/uploads:
 *   get:
 *     summary: Get all files
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
 *                 files:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/File'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Upload a file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               file:
 *                 $ref: '#/components/schemas/File'
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hint:
 *                   type: object
 *                 error:
 *                   type: string
 *   patch:
 *     summary: Update a file
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               show:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: File updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hint:
 *                   type: object
 *                 error:
 *                   type: string
 *   delete:
 *     summary: Delete a file
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hint:
 *                   type: object
 *                 error:
 *                   type: string
 *
 */
import prisma from "@/lib/db";
import { addFile, removeFile } from "@/lib/manage-cdn";
import Galery from "@/types/File";
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const files: Galery = await prisma.galery.findMany();
        return res.status(200).json({ success: true, files });
      } catch (error) {
        return res.status(500).json({ success: false, files: {}, error });
      }
      break;
    case "POST":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ hint: {}, error: "Unauthorized" });
        }

        const form = formidable({});
        const [fields, filesIn] = await form.parse(req);

        if (
          filesIn.file &&
          fields.name?.toString() &&
          filesIn.file[0].originalFilename?.toString()
        ) {
          addFile(
            fields.name?.toString(),
            filesIn.file[0].originalFilename?.toString(),
            await fs.readFileSync(filesIn.file[0].filepath),
          );
          return res.status(200).json({ suceess: true });
        } else {
          return res.status(400).json({ error: "Bad request" });
        }
      } catch (error) {
        return res.status(500).json({ success: false, error });
      }
      break;
    case "PATCH":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ hint: {}, error: "Unauthorized" });
        }

        const form = formidable({});
        const [fields] = await form.parse(req);
        const { id, title, show } = fields;

        if (!id || !title || !show)
          return res.status(400).json({ success: false, error: "Bad request" });

        await prisma.galery.updateMany({
          where: { id: id.toString() },
          data: { title: title.toString(), shown: show.toString() == "true" },
        });

        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, error });
      }
      break;
    case "DELETE":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ hint: {}, error: "Unauthorized" });
        }

        if (!req?.query?.id)
          return res.status(400).json({ error: "Bad request" });

        removeFile(req.query.id.toString());

        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, error });
      }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
