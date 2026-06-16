import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CloudSun, CloudRain, Sun, Cloud, CloudSnow, CloudLightning, Loader2 } from 'lucide-react'

interface WeatherData {
  temp: number
  condition: string
  icon: string
  humidity: number
}

const ICONS: Record<string, typeof Sun> = {
  'clear': Sun,
  'cloud': Cloud,
  'rain': CloudRain,
  'snow': CloudSnow,
  'thunderstorm': CloudLightning,
  'drizzle': CloudRain,
  'mist': Cloud,
  'fog': Cloud,
  'partly-cloudy': CloudSun,
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/weather')
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        if (!cancelled) setWeather(data)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchWeather()
    const interval = setInterval(fetchWeather, 300000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  if (loading) return null
  if (error || !weather) return null

  const Icon = ICONS[weather.condition] || CloudSun

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/10"
    >
      <Icon className="w-4 h-4 text-accent" />
      <span className="text-xs font-medium text-fg">{Math.round(weather.temp)}°C</span>
      <span className="text-[10px] text-muted capitalize">{weather.condition}</span>
    </motion.div>
  )
}
