/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
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
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Create a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               published:
 *                 type: boolean
 *               date:
 *                 type: string
 *               type:
 *                 type: string
 *               displayType:
 *                 type: string
 *               toUrl:
 *                 type: string
 *               redirectUrl:
 *                 type: string
 *               displayTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update a message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Message updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

import prisma from "@/lib/db";
import Message, { MessageType, MessageTypeDisplay } from "@/types/Message";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const messages = await prisma.message.findMany({});
        return res.status(200).json({
          success: true,
          messages: req?.query?.force
            ? messages
            : messages.filter((message: any) => message.published),
        });
      } catch (error) {
        return res.status(500).json({ success: false, messages: [], error });
      }
      break;
    case "PUT":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ messages: [], error: "Unauthorized" });
        }

        const message: Message = {
          message: req.body.message || null,
          published: req.body.published || false,
          date: req.body.date || new Date(),
          type: req.body.type || ("INFO" as MessageType),
          displayType: req.body.displayType || ("BANNER" as MessageTypeDisplay),
          toUrl: req.body.toUrl || null,
          redirectUrl: req.body.redirectUrl || null,
          displayTime: req.body.displayTime || null,
        };

        await prisma.message.create({ data: message } as any);

        return res.status(200).json({
          success: true,
          messages: [await prisma.message.findMany({})],
        });
      } catch (error) {
        return res.status(500).json({ success: false, messages: [], error });
      }
      break;
    case "DELETE":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ messages: [], error: "Unauthorized" });
        }

        if (!("id" in req.body))
          return res.status(400).json({ messages: [], error: "Bad request" });

        await prisma.message.delete({
          where: { id: req.body.id },
        });

        return res
          .status(200)
          .json({ success: true, message: "Message deleted" });
      } catch (error) {
        return res.status(500).json({ success: false, messages: [], error });
      }
      break;
    case "PATCH":
      try {
        const session = await getServerSession(req, res, {});

        if (!session) {
          return res.status(401).json({ messages: [], error: "Unauthorized" });
        }

        const {
          id,
          message,
          published,
          date,
          type,
          displayType,
          toUrl,
          redirectUrl,
          displayTime,
        } = req.body;

        const findedMessage = await prisma.message.findUnique({
          where: { id },
        });

        const updatedData: Message | any = {
          message: message !== findedMessage?.message && message,
          published: published !== findedMessage?.published && published,
          date: date !== findedMessage?.date && date,
          type: type !== findedMessage?.type && type,
          displayType:
            displayType !== findedMessage?.displayType && displayType,
          toUrl: toUrl !== findedMessage?.toUrl && toUrl,
          redirectUrl:
            redirectUrl !== findedMessage?.redirectUrl && redirectUrl,
          displayTime:
            displayTime !== findedMessage?.displayTime && displayTime,
        };

        await prisma.message.update({
          where: { id },
          data: updatedData as any,
        });

        return res
          .status(200)
          .json({ success: true, message: "Message updated" });
      } catch (error) {
        return res.status(500).json({ success: false, messages: [], error });
      }
      break;

    default:
      return res.status(405).end();
  }
}
