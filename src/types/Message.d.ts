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
 *           type: object
 *           properties:
 *            from:
 *             type: string
 *           to:
 *            type: string
 */

import { $Enums, Message as _Message } from "@prisma/client";

export type MessageType = "INFO" | "UPDATE" | "WARNING" | "ERROR" | "SILENT";
export type MessageTypeDisplay = "POPUP" | "BANNER";

type TimeRange = {
  from: string;
  to: string;
};

export default interface Message extends _Message {
  id?: string;
  message: string | null;
  published: boolean;
  date: Date;
  type: $Enums.MessageType;
  displayType: $Enums.MessageTypeDisplay;
  toUrl: string | null;
  redirectUrl: string | null;
  displayTime: TimeRange;
}
