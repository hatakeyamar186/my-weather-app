import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WeatherDisplay from '../components/WeatherDisplay'
import ClothingSuggestion from '../components/ClothingSuggestion'

const Home = () => {
  const [temp, setTemp] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const API_KEY = 'aabc29d8b83937fa574e6e46beebba54'

  useEffect(() => {
    const fetchWeather = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude

          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            )
            const data = await res.json()
            console.log(data)

            if (data.main && typeof data.main.temp === 'number') {
              setTemp(data.main.temp)
            } else {
              setError('天気データが取得できませんでした')
            }
          } catch (error) {
            console.error('天気情報の取得に失敗しました。', error)
            setError('天気情報の取得に失敗しました。')
          } finally {
            setLoading(false)
          }
        },
        (geoError) => {
          console.error('位置情報取得に失敗:', geoError)
          setError('位置情報を取得できませんでした')
          setLoading(false)
        }
      )
    }

    fetchWeather()
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>服装ガイド</h1>
      {loading ? (
        <p>天気を取得中...</p>
      ) : error ? (
        <p>{error}</p>
      ) : temp !== null ? (
        <>
          <WeatherDisplay temperature={temp} />
          <ClothingSuggestion temperature={temp} />
          <button
            onClick={() => navigate('/')}
            style={{
              fontSize: '1.2rem',
              padding: '0.5rem 1.5rem',
              marginTop: '1.5rem',
            }}
          >
            ホームに戻る
          </button>
        </>
      ) : (
        <p>天気情報の取得に失敗しました。</p>
      )}
    </main>
  )
}

export default Home
