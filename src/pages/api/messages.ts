import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const messages = await prisma.message.findMany({});
        return res.status(200).json({
          success: true,
          messages: req?.query?.force
            ? messages
            : messages.filter((message) => message.published),
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

        const messageId = req.body.messageId;

        await prisma.message.delete({
          where: { id: messageId },
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
          messageId,
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
          where: { id: messageId },
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
          where: { id: messageId },
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
