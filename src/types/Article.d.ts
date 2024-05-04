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
 *         date:
 *           type: string
 *           format: date
 *
 */

export interface Article {
  title: string;
  content: string;
  img: string;
  date: string;
}
