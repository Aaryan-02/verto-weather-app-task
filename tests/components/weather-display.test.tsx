import { render, screen } from "@testing-library/react"
import { WeatherDisplay } from "@/components/weather-display"

// Mock WeatherIcon to avoid dependency on icon libs in tests
jest.mock("@/components/weather-icons", () => ({
  WeatherIcon: () => <div data-testid="weather-icon" />,
}))

// Mock utils to keep tests deterministic
jest.mock("@/lib/weather-utils", () => ({
  convertTemp: jest.fn(() => 25),
  getWeatherBackground: jest.fn(() => "bg-blue-500"),
}))

describe("WeatherDisplay", () => {
  const baseWeather = {
    city: "London",
    country: "GB",
    temperature: 18,
    condition: "clear",
    description: "clear sky",
    humidity: 40,
    windSpeed: 3,
    visibility: 10,
    feelsLike: 17,
    icon: "01d",
  }

  it("prompts when no weather data", () => {
    render(<WeatherDisplay weather={null} loading={false} error={null} temperatureUnit="C" />)
    expect(screen.getByText(/search for a city/i)).toBeInTheDocument()
  })

  it("shows error when provided", () => {
    render(<WeatherDisplay weather={null} loading={false} error="Something went wrong" temperatureUnit="C" />)
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
  })

  it("renders weather details when data exists", () => {
    render(<WeatherDisplay weather={baseWeather} loading={false} error={null} temperatureUnit="C" />)

    expect(screen.getByText(/London, GB/)).toBeInTheDocument()
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument()
    expect(screen.getByTestId("weather-icon")).toBeInTheDocument()
    
    expect(screen.getByText(/18\s*°\s*C/)).toBeInTheDocument()
  })
})
