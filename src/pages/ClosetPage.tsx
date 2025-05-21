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
    <main style={{ padding: '2rem' }}>
      <h1>👕 あなたのクローゼット</h1>
      <ClothingForm onAdd={handleAdd} />
      <h2>🧾 登録済みの服</h2>
      <ClothingList clothes={clothes} onDelete={handleDelete} />
      <button
        onClick= {() => navigate(-1)}
        style={{ marginTop: '1.5rem', padding: '0.5rem 1rem' }}
        >
            ← 前のページに戻る
        </button>
    </main>
  )
}

export default ClosetPage
