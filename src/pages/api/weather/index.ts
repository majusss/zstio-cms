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
 *                success:
 *                  type: boolean
 *                weather:
 *                 type: object
 *                 properties:
 *                   now:
 *                     type: object
 *                     properties:
 *                       show:
 *                         type: boolean
 *                       temperature:
 *                         type: number
 *                       icons:
 *                         type: array
 *                         items:
 *                           type: string
 *                   hourly:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         time:
 *                           type: string
 *                         temperature:
 *                           type: number
 *                         icon:
 *                           type: string
 *       500:
 *         description: Internal server error
 */

import prisma from "@/lib/db";
import { convertWeatherCode, isDay } from "@/lib/weather";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Cache-Control", "public, s-maxage=1800");
  const settings = await prisma.settings.findFirst();
  if (settings?.weatherApi) {
    const nowReq = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=50.018611&lon=22.679722&leng=pl&units=metric&appid=${settings.weatherApi}`,
    );
    const hourlyReq = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=50.0162&longitude=22.6778&hourly=temperature_2m,weather_code&daily=sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=1",
    );
    res.status(200).json({
      success: true,
      weather: {
        now: {
          show: ((await prisma.settings.findFirst()) || { showWeather: false })
            .showWeather,
          temperature: nowReq.data.main.temp,
          icons: nowReq.data.weather.map(
            (w: { icon: string }) =>
              `https://openweathermap.org/img/wn/${w.icon}@4x.png`,
          ),
        },
        hourly: hourlyReq.data.hourly.time.map((time: any, index: number) => {
          return {
            time,
            temperature: hourlyReq.data.hourly.temperature_2m[index],
            icon: `https://openweathermap.org/img/wn/${
              convertWeatherCode(
                hourlyReq.data.hourly.weather_code[index],
                isDay(
                  hourlyReq.data.daily.sunrise[0],
                  hourlyReq.data.daily.sunset[0],
                  new Date(time).getHours(),
                ),
              )?.icon
            }@4x.png`,
          };
        }),
      },
    });
  } else {
    return res
      .status(500)
      .json({ success: false, weather: {}, error: "No api key" });
  }
}
