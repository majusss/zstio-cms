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

export interface File {
  id: string;
  title: string;
  deleteHash: string;
  url: string;
  shown: boolean;
}
