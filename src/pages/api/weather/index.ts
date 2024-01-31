/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Get weather data
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */

// TODO: PROXY ONLY REQUIRED DATA
import prisma from "@/lib/db";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Cache-Control", "public, s-maxage=600");
  const settings = await prisma.settings.findFirst();
  if (settings?.weatherApi) {
    if (settings?.showWeather) {
      const request = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=50.018611&lon=22.679722&leng=pl&units=metric&appid=${settings.weatherApi}`,
      );
      res.status(request.status).json(request.data);
    } else {
      return res.status(200).json({ success: true });
    }
  } else {
    return res
      .status(500)
      .json({ success: false, weather: {}, error: "No api key" });
  }
}
