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

/* eslint-disable */
export enum ScreenId {
  WEATHER,
  SPOTIFY,
  GALERY,
  NEWS,
}

export interface Screen {
  id: ScreenId;
  index: number;
  title: string;
  displayTimeSeconds: number;
  show: boolean;
}
