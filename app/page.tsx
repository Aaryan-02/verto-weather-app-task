"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { WeatherDisplay } from "@/components/weather-display"
import { ForecastDisplay } from "@/components/forecast-display"
import { TemperatureToggle } from "@/components/temperature-toggle"
import { useWeather } from "@/hooks/use-weather"

const convertTemperature = (temp: number, fromUnit: "C" | "F", toUnit: "C" | "F"): number => {
  if (fromUnit === toUnit) return temp
  if (fromUnit === "C" && toUnit === "F") return (temp * 9) / 5 + 32
  if (fromUnit === "F" && toUnit === "C") return ((temp - 32) * 5) / 9
  return temp
}

const getDynamicBackground = (condition: string | null) => {
  if (!condition) return "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"

  switch (condition.toLowerCase()) {
    case "clear":
      return "bg-gradient-to-br from-orange-400 via-yellow-500 to-amber-600"
    case "clouds":
      return "bg-gradient-to-br from-gray-600 via-slate-700 to-gray-800"
    case "rain":
    case "drizzle":
      return "bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-900"
    case "snow":
      return "bg-gradient-to-br from-slate-300 via-blue-200 to-indigo-300"
    case "thunderstorm":
      return "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900"
    default:
      return "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
  }
}

export default function WeatherApp() {
  const { currentWeather, forecast, loading, error, searchWeather } = useWeather()

  const [lastSearchedCity, setLastSearchedCity] = useState<string>("")
  const [temperatureUnit, setTemperatureUnit] = useState<"C" | "F">("C")

  // Load last searched city and temperature unit from localStorage on mount
  useEffect(() => {
    const savedCity = localStorage.getItem("lastSearchedCity")
    const savedUnit = localStorage.getItem("temperatureUnit") as "C" | "F"

    if (savedCity) {
      setLastSearchedCity(savedCity)
      searchWeather(savedCity)
    }

    if (savedUnit) {
      setTemperatureUnit(savedUnit)
    }
  }, [searchWeather])

  const handleSearch = (city: string) => {
    setLastSearchedCity(city)
    localStorage.setItem("lastSearchedCity", city)
    searchWeather(city)
  }

  const handleTemperatureToggle = (unit: "C" | "F") => {
    setTemperatureUnit(unit)
    localStorage.setItem("temperatureUnit", unit)
  }

  const dynamicBackground = getDynamicBackground(currentWeather?.condition || null)

  return (
    <div
      className={`min-h-screen ${dynamicBackground} relative overflow-hidden transition-all duration-1000 ease-in-out`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/10 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-secondary/10 rounded-full blur-xl animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-2xl">☁️</span>
            </div>
            <h1 className="text-5xl font-bold text-balance bg-gradient-to-r from-white via-slate-100 to-white/80 bg-clip-text text-transparent">
              Weather App
            </h1>
          </div>
          <p className="text-white/80 text-xl font-medium">Discover weather conditions and forecasts worldwide</p>

          <div className="flex justify-center mt-6">
            <TemperatureToggle unit={temperatureUnit} onToggle={handleTemperatureToggle} />
          </div>
        </div>

        <div className="space-y-8">
          <SearchBar onSearch={handleSearch} />

          {lastSearchedCity && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">
                  Last searched: <span className="text-primary-foreground font-semibold">{lastSearchedCity}</span>
                </span>
              </div>
            </div>
          )}

          <WeatherDisplay weather={currentWeather} loading={loading} error={error} temperatureUnit={temperatureUnit} />

          {currentWeather && !loading && !error && (
            <ForecastDisplay forecast={forecast} loading={loading} temperatureUnit={temperatureUnit} />
          )}
        </div>
      </div>
    </div>
  )
}
