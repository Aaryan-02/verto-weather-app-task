import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    )

    if (!forecastResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch forecast data." }, { status: 500 })
    }

    const forecastData = await forecastResponse.json()

    // Process 5-day forecast (take one reading per day at noon)
    const dailyForecasts: any[] = []
    const processedDates = new Set<string>()

    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000)
      const dateString = date.toDateString()

      // Take the forecast closest to noon for each day
      if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
        processedDates.add(dateString)

        dailyForecasts.push({
          date: date.toISOString(),
          day: date.toLocaleDateString("en", { weekday: "short" }),
          temperature: {
            min: item.main.temp_min,
            max: item.main.temp_max,
          },
          condition: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        })
      }
    })

    return NextResponse.json({ forecast: dailyForecasts })
  } catch (error) {
    console.error("Forecast API error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
