/**
 * @swagger
 * components:
 *   schemas:
 *     Screen:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *            enum: [WEATHER,SPOTIFY,GALERY,NEWS]
 *         title:
 *            type: string
 *         displayTimeSeconds:
 *            type: number
 *         show:
 *            type: boolean
 */

import { Screen as _Screen } from "@prisma/client";

/* eslint-disable */
export enum ScreenId {
  WEATHER,
  SPOTIFY,
  GALERY,
  NEWS,
}

export default interface Screen extends _Screen {
  id: ScreenId;
  title: string;
  displayTimeSeconds: number;
  show: boolean;
}
