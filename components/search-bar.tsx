"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (city: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card rounded-2xl p-2 shadow-2xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-200 text-lg">📍</span>
              <Input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/10 border-white/20 text-slate-100 placeholder:text-slate-300 focus:bg-white/20 focus:border-primary/50 rounded-xl"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
              disabled={!city.trim()}
            >
              <span className="mr-2 text-lg">🔍</span>
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
