/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Get weather data
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temperature:
 *                   type: number
 *                 icons:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Cache-Control", "public, s-maxage=600");
  const settings = await prisma.settings.findFirst();
  if (settings?.weatherApi) {
    const request = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=50.018611&lon=22.679722&leng=pl&units=metric&appid=${settings.weatherApi}`,
    );
    res.status(request.status).json({
      temperature: request.data.main.temp,
      icons: [
        request.data.weather.map(
          (w: any) => `https://openweathermap.org/img/wn/${w.icon}@4x.png`,
        ),
      ],
    });
  } else {
    return res
      .status(500)
      .json({ success: false, weather: {}, error: "No api key" });
  }
}
