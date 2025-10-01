import { WiDaySunny, WiCloudy, WiDayCloudyHigh, WiDayRain, WiDaySnow, WiDayThunderstorm } from "react-icons/wi"

interface WeatherIconProps {
  condition: string
  size?: number
  className?: string
}

export function WeatherIcon({ condition, size = 48, className = "" }: WeatherIconProps) {
  const wrapperStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: size + 16,
    height: size + 16,
    borderRadius: "50%",
    background: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(8px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  }

  const iconStyle = {
    fontSize: size,
    color: getWeatherColor(condition.toLowerCase()),
    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))",
  }

  function getWeatherColor(condition: string): string {
    switch (condition) {
      case "clear":
        return "#FFF700" // Bright yellow for sunny (more vibrant against dark background)
      case "clouds":
        return "#E5E7EB" // Light gray for cloudy
      case "rain":
      case "drizzle":
        return "#60A5FA" // Bright blue for rain
      case "snow":
        return "#F8FAFC" // Pure white for snow
      case "thunderstorm":
        return "#A78BFA" // Light purple for thunderstorm
      default:
        return "#D1D5DB" // Light gray default
    }
  }

  const IconComponent = () => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <WiDaySunny style={iconStyle} />

      case "clouds":
        return <WiCloudy style={iconStyle} />

      case "rain":
      case "drizzle":
        return <WiDayRain style={iconStyle} />

      case "snow":
        return <WiDaySnow style={iconStyle} />

      case "thunderstorm":
        return <WiDayThunderstorm style={iconStyle} />

      default:
        return <WiDayCloudyHigh style={iconStyle} />
    }
  }

  return (
    <div style={wrapperStyle} className={className}>
      <IconComponent />
    </div>
  )
}
