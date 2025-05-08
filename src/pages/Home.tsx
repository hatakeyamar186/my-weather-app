import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WeatherDisplay from '../components/WeatherDisplay'
import ClothingSuggestion from '../components/ClothingSuggestion'

const Home = () => {
  const [temp, setTemp] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // ★ ここにAPIキーを直書き ★
  const API_KEY = 'aabc29d8b83937fa574e6e46beebba54' // ← ここに自分のOpenWeatherMap APIキーを入力！

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=aabc29d8b83937fa574e6e46beebba54`
        )
        const data = await res.json()
        console.log(data); // デバッグ用：APIからのレスポンスをコンソールに表示
        setTemp(data.main.temp)
      } catch (error) {
        console.error('天気情報の取得に失敗しました。', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>服装ガイド</h1>
      {loading ? (
        <p>天気を取得中...</p>
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
