/**
 * @swagger
 * components:
 *   schemas:
 *     Settings:
 *       type: object
 *       properties:
 *         weatherApi:
 *            type: string
 *         showWeather:
 *            type: boolean
 *         hintText:
 *            type: string
 *         showHint:
 *            type: boolean
 *         spotifyRefresh:
 *            type: string
 *         showSpotify:
 *            type: boolean
 *         showGallery:
 *            type: boolean
 *         showNews:
 *            type: boolean
 */

import { Settings as _Settings } from "@prisma/client";

export default interface Settings extends _Settings {
  weatherApi?: string;
  showWeather: boolean;
  hintText?: string;
  showHint: boolean;
  spotifyRefresh?: string;
  showSpotify: boolean;
  showGallery: boolean;
  showNews: boolean;
}
