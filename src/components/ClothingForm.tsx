// src/components/ClothingForm.tsx
import { useState } from 'react'

// 服の型（ClothingItem）をこの中に定義してもOKですが、将来共通化するなら types.ts に移動
export interface ClothingItem {
  id: string
  name: string
  category: string
  tempRange: string // 例: "10〜18"
}

interface ClothingFormProps {
  onAdd: (item: ClothingItem) => void
}

const toHalfWidth = (str: string) => {
    return str.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 65248))
}

const normalizedTempRange = (input: string) => 
    toHalfWidth(input).replace(/[〜~ー－—―‐−]/g, '-')

const ClothingForm = ({ onAdd }: ClothingFormProps) => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [tempRange, setTempRange] = useState('')

  const handleSubmit = () => {
    if (!name || !category || !tempRange) return

    const cleanedRange = normalizedTempRange(tempRange)

    const newItem: ClothingItem = {
      id: crypto.randomUUID(), // ランダムなID
      name,
      category,
      tempRange: cleanedRange,
    }

    onAdd(newItem) // 親コンポーネントに新しい服を渡す

    // 入力欄をクリア
    setName('')
    setCategory('')
    setTempRange('')
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <input
        placeholder="服の名前"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <input
        placeholder="カテゴリ"
        value={category}
        onChange={e => setCategory(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <input
        placeholder="推奨気温（例：10〜18）"
        value={tempRange}
        onChange={e => setTempRange(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <button onClick={handleSubmit}>登録</button>
    </div>
  )
}

export default ClothingForm
