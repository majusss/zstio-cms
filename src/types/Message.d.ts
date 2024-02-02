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
 *            to:
 *             type: string
 */

export type MessageType = "INFO" | "UPDATE" | "WARNING" | "ERROR" | "SILENT";
export type MessageTypeDisplay = "POPUP" | "BANNER";

export type TimeRange = {
  from: string;
  to: string;
};

export interface Message {
  id?: string;
  message?: string;
  published: boolean;
  date: Date;
  type: MessageType;
  displayType: MessageTypeDisplay;
  toUrl?: string;
  redirectUrl?: string;
  displayTime?: TimeRange;
}
