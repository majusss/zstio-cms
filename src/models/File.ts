/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         deleteHash:
 *           type: string
 *         url:
 *           type: string
 *         shown:
 *           type: boolean
 */

import { Galery as _File } from "@prisma/client";

export default interface File extends _File {
  id: string;
  title: string;
  deleteHash: string;
  url: string;
  shown: boolean;
}
