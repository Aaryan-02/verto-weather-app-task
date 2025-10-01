import { convertTemp, getWeatherBackground } from "@/lib/weather-utils"

describe("convertTemp", () => {
  it("converts Celsius to Fahrenheit correctly", () => {
    expect(convertTemp(0, "F")).toBe(32)
    expect(convertTemp(100, "F")).toBe(212)
    expect(convertTemp(-40, "F")).toBe(-40)
  })

  it("rounds Celsius to nearest integer when unit is C", () => {
    expect(convertTemp(21.6, "C")).toBe(22)
    expect(convertTemp(21.4, "C")).toBe(21)
  })
})

describe("getWeatherBackground", () => {
  it("returns the correct background token for known conditions", () => {
    expect(getWeatherBackground("clear")).toBe("bg-weather-sunny")
    expect(getWeatherBackground("CLOUDS")).toBe("bg-weather-cloudy")
    expect(getWeatherBackground("rain")).toBe("bg-weather-rainy")
    expect(getWeatherBackground("drizzle")).toBe("bg-weather-rainy")
    expect(getWeatherBackground("snow")).toBe("bg-weather-snowy")
    expect(getWeatherBackground("thunderstorm")).toBe("bg-weather-stormy")
  })

  it("falls back to cloudy for unknown conditions", () => {
    expect(getWeatherBackground("unknown")).toBe("bg-weather-cloudy")
    expect(getWeatherBackground("")).toBe("bg-weather-cloudy")
    // @ts-expect-error intentional: verify robustness for invalid input
    expect(getWeatherBackground(undefined)).toBe("bg-weather-cloudy")
  })
})
