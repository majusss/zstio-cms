/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *         message:
 *            type: string
 *         published:
 *            type: boolean
 *         date:
 *            type: string
 *         type:
 *            type: string
 *         displayType:
 *            type: string
 *         toUrl:
 *            type: string
 *         redirectUrl:
 *            type: string
 *         displayTime:
 *            type: string
 */

import { Message as _Message } from "@prisma/client";

export default interface Message extends _Message {
  id?: string;
  message: string | null;
  published: boolean;
  date: Date;
  type: $Enums.MessageType;
  displayType: $Enums.MessageTypeDisplay;
  toUrl: string | null;
  redirectUrl: string | null;
  displayTime: TimeRanges;
}

type MessageType = "INFO" | "UPDATE" | "WARNING" | "ERROR" | "SILENT";
type MessageTypeDisplay = "POPUP" | "BANNER";

type TimeRange = {
  from: string;
  to: string;
};
