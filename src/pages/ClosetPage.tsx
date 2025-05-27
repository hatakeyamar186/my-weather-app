import { useState, useEffect } from 'react'
import ClothingForm from '../components/ClothingForm'
import { ClothingItem } from '../types'
import ClothingList from '../components/ClothingList'
import { useNavigate } from 'react-router-dom'

const ClosetPage = () => {
  const [clothes, setClothes] = useState<ClothingItem[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('clothes')
    if (stored) {
      setClothes(JSON.parse(stored))
    }
  }, [])

  const handleAdd = (item: ClothingItem) => {
    const updated = [...clothes, item]
    setClothes(updated)
    localStorage.setItem('clothes', JSON.stringify(updated))
  }

  const handleDelete = (id: string) => {
    const updated = clothes.filter(item => item.id !== id)
    setClothes(updated)
    localStorage.setItem('clothes', JSON.stringify(updated))
  }

  return (
    <main 
      style={{
        padding: '2rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h1 className="text-2xl font-bold mb-4">👕 あなたのクローゼット</h1>

      <ClothingForm onAdd={handleAdd} />

      <h2 className="text-xl font-semibold mt-8 mb-2">🧾 登録済みの服</h2>
      <ClothingList clothes={clothes} onDelete={handleDelete} />
      
      <button
        onClick= {() => navigate(-1)}
        className="mt-8 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded shadow"
        >
            ← 前のページに戻る
        </button>
    </main>
  )
}

export default ClosetPage
