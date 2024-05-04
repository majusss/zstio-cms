export const isDay = (sunrise: string, sunset: string, hour: number) => {
  const sunriseDate = new Date(sunrise);
  const sunsetDate = new Date(sunset);
  const currentDate = new Date();
  currentDate.setHours(hour);

  return (
    currentDate.getTime() > sunriseDate.getTime() &&
    currentDate.getTime() < sunsetDate.getTime()
  );
};

export const convertWeatherCode = (code: string, isDay: boolean) => {
  const mapping: {
    [code: string]: {
      group: string;
      main: string;
      description: string;
      icon: string;
    };
  } = {
    "0": { group: "800", main: "Clear", description: "clear sky", icon: "01" },
    "1": {
      group: "80x",
      main: "Clouds",
      description: "few clouds: 11-25%",
      icon: "02",
    },
    "2": {
      group: "80x",
      main: "Clouds",
      description: "scattered clouds: 25-50%",
      icon: "03",
    },
    "3": {
      group: "80x",
      main: "Clouds",
      description: "broken clouds: 51-84%",
      icon: "04",
    },
    "45": { group: "701", main: "Mist", description: "mist", icon: "50" },
    "48": { group: "701", main: "Mist", description: "mist", icon: "50" },
    "51": {
      group: "3xx",
      main: "Drizzle",
      description: "light intensity drizzle",
      icon: "09",
    },
    "53": {
      group: "3xx",
      main: "Drizzle",
      description: "drizzle",
      icon: "09",
    },
    "55": {
      group: "3xx",
      main: "Drizzle",
      description: "heavy intensity drizzle",
      icon: "09",
    },
    "56": {
      group: "3xx",
      main: "Drizzle",
      description: "light intensity drizzle rain",
      icon: "09",
    },
    "57": {
      group: "3xx",
      main: "Drizzle",
      description: "drizzle rain",
      icon: "09",
    },
    "61": {
      group: "5xx",
      main: "Rain",
      description: "light rain",
      icon: "10",
    },
    "63": {
      group: "5xx",
      main: "Rain",
      description: "moderate rain",
      icon: "10",
    },
    "65": {
      group: "5xx",
      main: "Rain",
      description: "heavy intensity rain",
      icon: "10",
    },
    "66": {
      group: "5xx",
      main: "Rain",
      description: "very heavy rain",
      icon: "10",
    },
    "67": {
      group: "5xx",
      main: "Rain",
      description: "extreme rain",
      icon: "10",
    },
    "71": {
      group: "6xx",
      main: "Snow",
      description: "light snow",
      icon: "13",
    },
    "73": { group: "6xx", main: "Snow", description: "snow", icon: "13" },
    "75": {
      group: "6xx",
      main: "Snow",
      description: "heavy snow",
      icon: "13",
    },
    "77": { group: "6xx", main: "Snow", description: "sleet", icon: "13" },
    "80": { group: "7xx", main: "Atmosphere", description: "fog", icon: "50" },
    "81": {
      group: "7xx",
      main: "Atmosphere",
      description: "smoke",
      icon: "50",
    },
    "82": {
      group: "7xx",
      main: "Atmosphere",
      description: "haze",
      icon: "50",
    },
    "85": {
      group: "7xx",
      main: "Atmosphere",
      description: "dust",
      icon: "50",
    },
    "86": {
      group: "7xx",
      main: "Atmosphere",
      description: "san",
      icon: "50",
    },
    "95": {
      group: "2xx",
      main: "Thunderstorm",
      description: "thunderstorm with light rain",
      icon: "11",
    },
    "96": {
      group: "2xx",
      main: "Thunderstorm",
      description: "thunderstorm with rain",
      icon: "11",
    },
    "99": {
      group: "2xx",
      main: "Thunderstorm",
      description: "thunderstorm with heavy rain",
      icon: "11",
    },
  };

  const entry = mapping[code];
  if (!entry) return null;

  const { group, main, description, icon } = entry;
  const id = group === "2xx" ? `${code}` : `${group}${code}`;

  return {
    id,
    main,
    description,
    icon: icon + (isDay ? "d" : "n"),
  };
};
