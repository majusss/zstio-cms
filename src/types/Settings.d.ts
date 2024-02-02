/**
 * @swagger
 * components:
 *   schemas:
 *     Settings:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         weatherApi:
 *           type: string
 *         showWeather:
 *           type: boolean
 *         hintText:
 *           type: string
 *         showHint:
 *           type: boolean
 *         spotifyRefresh:
 *           type: string
 *         showSpotify:
 *           type: boolean
 *         showGallery:
 *           type: boolean
 *         showNews:
 *           type: boolean
 */

export interface Settings {
  id?: string;
  weatherApi: string | null;
  showWeather: boolean;
  hintText: string | null;
  showHint: boolean;
  spotifyRefresh: string | null;
  showSpotify: boolean;
  showGalery: boolean;
  showNews: boolean;
}
