/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         img:
 *           type: string
 */

export interface Article {
  title: string;
  content: string;
  img: string;
}
