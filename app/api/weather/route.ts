import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY
    
    // Current weather API call
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    )

    if (!currentResponse.ok) {
      if (currentResponse.status === 404) {
        return NextResponse.json({ error: "City not found. Please check the spelling and try again." }, { status: 404 })
      }
      return NextResponse.json({ error: "Failed to fetch weather data. Please try again." }, { status: 500 })
    }

    const currentData = await currentResponse.json()

    // Process current weather
    const weather = {
      city: currentData.name,
      country: currentData.sys.country,
      temperature: currentData.main.temp,
      condition: currentData.weather[0].main,
      description: currentData.weather[0].description,
      humidity: currentData.main.humidity,
      windSpeed: currentData.wind.speed,
      visibility: currentData.visibility / 1000, // Convert to km
      feelsLike: currentData.main.feels_like,
      icon: currentData.weather[0].icon,
    }

    return NextResponse.json({ weather })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
