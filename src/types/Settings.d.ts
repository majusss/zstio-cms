/**
 * @swagger
 * components:
 *   schemas:
 *     Settings:
 *       type: object
 *       properties:
 *         hintText:
 *           type: string | null
 *         showHint:
 *           type: boolean
 *         showSpotify:
 *           type: boolean
 *         showTimer:
 *           type: boolean
 *         showWeather:
 *           type: boolean
 *         showHappyNumber:
 *           type: boolean
 */

export interface Settings {
  hintText: string | null;
  showHint: boolean;
  showSpotify: boolean;
  showTimer: boolean;
  showWeather: boolean;
  showHappyNumber: boolean;
}
