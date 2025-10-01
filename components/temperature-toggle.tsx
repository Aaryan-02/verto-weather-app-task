"use client"

interface TemperatureToggleProps {
  unit: "C" | "F"
  onToggle: (unit: "C" | "F") => void
}

export function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <div className="flex items-center gap-2 glass-card rounded-full p-1">
      <button
        onClick={() => onToggle("C")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          unit === "C"
            ? "bg-white/20 text-white shadow-lg scale-105"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onToggle("F")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          unit === "F"
            ? "bg-white/20 text-white shadow-lg scale-105"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
      >
        °F
      </button>
    </div>
  )
}
