import type { VercelRequest, VercelResponse } from '@vercel/node'

const LAT = 6.2667
const LON = 0.0667

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) {
    return res.status(200).json({ temp: 28, condition: 'partly-cloudy', icon: '02d', humidity: 70 })
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${apiKey}`
    )
    if (!response.ok) throw new Error('Weather API failed')
    const data = await response.json()

    const condition = data.weather?.[0]?.main?.toLowerCase() || 'clear'
    const mapped = {
      thunderstorm: 'thunderstorm',
      drizzle: 'drizzle',
      rain: 'rain',
      snow: 'snow',
      mist: 'mist',
      fog: 'fog',
      haze: 'mist',
      clear: 'clear',
      clouds: 'cloud',
    }[condition] || 'partly-cloudy'

    res.json({
      temp: Math.round(data.main?.temp || 28),
      condition: mapped,
      icon: data.weather?.[0]?.icon || '02d',
      humidity: data.main?.humidity || 70,
    })
  } catch {
    res.status(200).json({ temp: 28, condition: 'partly-cloudy', icon: '02d', humidity: 70 })
  }
}
