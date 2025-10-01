export type TempUnit = "C" | "F"

export function convertTemp(temp: number, unit: TempUnit): number {
  if (unit === "F") {
    return Math.round((temp * 9) / 5 + 32)
  }
  return Math.round(temp)
}

export function getWeatherBackground(condition: string): string {
  switch ((condition || "").toLowerCase()) {
    case "clear":
      return "bg-weather-sunny"
    case "clouds":
      return "bg-weather-cloudy"
    case "rain":
    case "drizzle":
      return "bg-weather-rainy"
    case "snow":
      return "bg-weather-snowy"
    case "thunderstorm":
      return "bg-weather-stormy"
    default:
      return "bg-weather-cloudy"
  }
}
