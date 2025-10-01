"use client"

import { useState, useCallback } from "react"

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

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`/api/weather?city=${encodeURIComponent(city)}`),
        fetch(`/api/forecast?city=${encodeURIComponent(city)}`),
      ])

      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json()
        throw new Error(errorData.error || "Failed to fetch weather data")
      }

      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json()
        throw new Error(errorData.error || "Failed to fetch forecast data")
      }

      const { weather } = await weatherResponse.json()
      const { forecast: forecastData } = await forecastResponse.json()

      setCurrentWeather(weather)
      setForecast(forecastData)
    } catch (err) {
      console.error("Weather API error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setCurrentWeather(null)
      setForecast([])
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    currentWeather,
    forecast,
    loading,
    error,
    searchWeather,
  }
}
