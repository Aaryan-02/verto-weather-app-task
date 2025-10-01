"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { WeatherIcon } from "@/components/weather-icons"
import { FaTemperatureHigh, FaTint, FaWind, FaEye, FaExclamationTriangle } from "react-icons/fa"

interface WeatherData {
  city: string
  country: string
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  visibility: number
  feelsLike: number
  icon: string
}

interface WeatherDisplayProps {
  weather: WeatherData | null
  loading: boolean
  error: string | null
  temperatureUnit: "C" | "F"
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

export function WeatherDisplay({ weather, loading, error, temperatureUnit }: WeatherDisplayProps) {
  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-3">
              <Skeleton className="h-8 w-48 bg-white/20" />
              <Skeleton className="h-4 w-32 bg-white/20" />
            </div>
            <Skeleton className="h-16 w-16 rounded-full bg-white/20" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2 p-4 rounded-2xl bg-white/10">
                <Skeleton className="h-4 w-16 bg-white/20" />
                <Skeleton className="h-6 w-20 bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-3xl p-6 border-destructive/20 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-destructive/20">
              <FaExclamationTriangle className="text-red-500 text-xl" />
            </div>
            <p className="text-slate-100 font-medium">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="glass-card rounded-3xl p-16 text-center shadow-2xl border-dashed border-white/30">
          <div className="p-4 rounded-full bg-white/10 w-fit mx-auto mb-6">
            <WeatherIcon condition="clouds" size={64} />
          </div>
          <p className="text-xl text-slate-200 font-medium">Search for a city to see the weather</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-card rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-balance text-slate-100 mb-2">
              {weather.city}, {weather.country}
            </h2>
            <p className="text-slate-200 capitalize text-lg font-medium">{weather.description}</p>
          </div>
          <div className="text-center">
            <div className="mb-3">
              <WeatherIcon condition={weather.condition} size={64} />
            </div>
            <div className="text-4xl font-bold text-slate-100 transition-all duration-500 ease-in-out">
              {convertTemp(weather.temperature, temperatureUnit)}°{temperatureUnit}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Feels Like */}
          <div className={`flex items-center gap-3 p-4 rounded-2xl ${getWeatherBackground(weather.condition)} backdrop-blur-sm border border-white/20`}>
            <div className="p-2 rounded-full bg-black hidden md:block">
              <FaTemperatureHigh className="text-orange-400 text-xl" /> 
            </div>
            <div>
              <p className="text-sm text-slate-200 font-medium">Feels like</p>
              <p className="font-bold text-slate-100 text-lg transition-all duration-500 ease-in-out">
                {convertTemp(weather.feelsLike, temperatureUnit)}°{temperatureUnit}
              </p>
            </div>
          </div>

          {/* Humidity */}
          <div className={`flex items-center gap-3 p-4 rounded-2xl ${getWeatherBackground(weather.condition)} backdrop-blur-sm border border-white/20`}>
            <div className="p-2 rounded-full bg-black hidden md:block">
              <FaTint className="text-blue-400 text-xl" /> 
            </div>
            <div>
              <p className="text-sm text-slate-200 font-medium">Humidity</p>
              <p className="font-bold text-slate-100 text-lg">{weather.humidity}%</p>
            </div>
          </div>

          {/* Wind */}
          <div className={`flex items-center gap-3 p-4 rounded-2xl ${getWeatherBackground(weather.condition)} backdrop-blur-sm border border-white/20`}>
            <div className="p-2 rounded-full bg-black hidden md:block">
              <FaWind className="text-cyan-300 text-xl" />
            </div>
            <div>
              <p className="text-sm text-slate-200 font-medium">Wind</p>
              <p className="font-bold text-slate-100 text-lg">{weather.windSpeed} m/s</p>
            </div>
          </div>

          {/* Visibility */}
          <div className={`flex items-center gap-3 p-4 rounded-2xl ${getWeatherBackground(weather.condition)} backdrop-blur-sm border border-white/20`}>
            <div className="p-2 rounded-full bg-black hidden md:block">
              <FaEye className="text-purple-400 text-xl" />
            </div>
            <div>
              <p className="text-sm text-slate-200 font-medium">Visibility</p>
              <p className="font-bold text-slate-100 text-lg">{weather.visibility} km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
