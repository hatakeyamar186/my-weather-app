import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WeatherDisplay from '../components/WeatherDisplay'
import ClothingSuggestion from '../components/ClothingSuggestion'

interface ClothingItem {
  id: string
  name: string
  category: string
  tempRange: string
}

const Home = () => {
  const [temp, setTemp] = useState<number | null>(null)
  const [location, setLocation] = useState<string | null>(null)
  const [iconCode, setIconCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [recommended, setRecommended] = useState<ClothingItem[]>([])

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
              setLocation(data.name)
              setIconCode(data.weather[0].icon)
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

  useEffect(() => {
    if (temp == null) return;

    const stored = localStorage.getItem('clothes')
    if (stored) {
      const allClothes: ClothingItem[] = JSON.parse(stored)

      const matched = allClothes.filter((item) => {
        const match = item.tempRange.match(/(\d+)[～~\-ー－—―‐−](\d+)/)
        if (!match) return false;
         
        const min = parseInt(match[1], 10)
        const max = parseInt(match[2], 10)
        return temp >= min && temp <= max
      })

      setRecommended(matched)
    }
  }, [temp])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>服装ガイド</h1>
      {loading ? (
        <p>天気を取得中...</p>
      ) : error ? (
        <p>{error}</p>
      ) : temp !== null ? (
        <>
        {location && <h2>{location}の現在の気温</h2>}

        {iconCode && (
          <img
            src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt="Weather icon"
            style={{ width: '80px', height: '80px' }}
          />
        )}
          <WeatherDisplay temperature={temp} />
          <ClothingSuggestion temperature={temp} />

          {recommended.length > 0 ? (
            <div style={{ marginTop: '2rem' }}>
              <h2>🧥 あなたの服からのおすすめ</h2>
              <ul>
                {recommended.map((item) => (
                  <li key={item.id}>
                    {item.name} ({item.category}) | {item.tempRange}℃
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p style={{marginTop: '1.5rem'}}>
              登録された服の中に、今日の気温に合う服はみつかりませんでした。
            </p>
          )}

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
