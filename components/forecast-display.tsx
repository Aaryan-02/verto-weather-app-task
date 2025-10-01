"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { WeatherIcon } from "@/components/weather-icons"
import { FaRegCalendarAlt } from "react-icons/fa"

interface ForecastDay {
  date: string
  day: string
  temperature: {
    min: number
    max: number
  }
  condition: string
  description: string
  icon: string
}

interface ForecastDisplayProps {
  forecast: ForecastDay[]
  loading: boolean
  temperatureUnit: "C" | "F" // Added temperature unit prop
}

const convertTemp = (temp: number, unit: "C" | "F"): number => {
  if (unit === "F") return Math.round((temp * 9) / 5 + 32)
  return Math.round(temp)
}

const getWeatherBackground = (condition: string) => {
  switch (condition.toLowerCase()) {
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

export function ForecastDisplay({ forecast, loading, temperatureUnit }: ForecastDisplayProps) {
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-slate-100 text-2xl"><FaRegCalendarAlt className="text-slate-100 text-2xl" /></span>
            <Skeleton className="h-6 w-32 bg-white/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="text-center space-y-3 p-4 rounded-2xl bg-white/10">
                <Skeleton className="h-4 w-16 mx-auto bg-white/20" />
                <Skeleton className="h-8 w-8 rounded-full mx-auto bg-white/20" />
                <Skeleton className="h-4 w-12 mx-auto bg-white/20" />
                <Skeleton className="h-4 w-20 mx-auto bg-white/20" />
              </div>
            ))}
          </div>
          <Skeleton className="h-64 w-full bg-white/20 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (!forecast || forecast.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-white/20">
            <span className="text-slate-100 text-xl"><FaRegCalendarAlt className="text-slate-100 text-2xl" /></span>
          </div>
          <h3 className="text-2xl font-bold text-slate-100">5-Day Forecast</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div
              key={day.date}
              className={`text-center p-5 rounded-2xl ${getWeatherBackground(day.condition)} backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-200 shadow-lg`}
            >
              <p className="font-bold text-slate-100 text-sm mb-3">{index === 0 ? "Today" : day.day}</p>
              <div className="flex justify-center mb-3">
                <WeatherIcon condition={day.condition} size={48} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-center items-center gap-2">
                  <span className="text-lg font-bold text-slate-100 transition-all duration-500 ease-in-out">
                    {convertTemp(day.temperature.max, temperatureUnit)}°
                  </span>
                  <span className="text-sm text-slate-200 transition-all duration-500 ease-in-out">
                    {convertTemp(day.temperature.min, temperatureUnit)}°
                  </span>
                </div>
                <p className="text-xs text-slate-200 capitalize leading-tight font-medium">{day.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
