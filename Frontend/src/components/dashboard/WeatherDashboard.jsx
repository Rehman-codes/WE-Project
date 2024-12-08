import { useState, useEffect } from 'react'

export default function WeatherDashboard() {
  const [weather, setWeather] = useState(null)
  const [time, setTime] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Get user's location and fetch weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
          )
          const data = await response.json()
          setWeather(data)          
          setLoading(false)
        } catch (error) {
          console.error('Error fetching weather:', error)
          setLoading(false)
        }
      })
    }
  }, [])

  const getWeatherBackground = () => {
    if (!weather) return 'clouds'
    const condition = weather.weather[0].main.toLowerCase()
    return condition
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  if (loading) {
    return (
      <div className="shadow rounded h-[95vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <main className={`shadow rounded h-[95vh] flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-background/50`}>
      {/* Dynamic weather background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center`}
        style={{
          backgroundImage: `url(/weather-backgrounds/${getWeatherBackground()}.jpg)`,
          opacity: 0.5
        }}
      />

      {/* Weather animations */}
      <div className="absolute inset-0 pointer-events-none">
        {getWeatherBackground() === 'rain' && (
          <div className="rain-animation" />
        )}
        {getWeatherBackground() === 'snow' && (
          <div className="snow-animation" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">
          {formatTime(time)}
        </h1>
        {weather && (
          <p className="text-2xl text-foreground/80">
            {Math.round(weather.main.temp)}°C | {weather.weather[0].main} | {weather.name}, {weather.sys.country}
          </p>
        )}
      </div>
    </main>
  )
}
