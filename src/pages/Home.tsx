import { useEffect, useState } from 'react'
import WeatherDisplay from '../components/WeatherDisplay'
import ClothingSuggestion from '../components/ClothingSuggestion'

const Home = () => {
  const [temp, setTemp] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

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
        </>
      ) : (
        <p>天気情報の取得に失敗しました。</p>
      )}
    </main>
  )
}

export default Home
