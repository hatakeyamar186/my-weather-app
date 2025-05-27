import { useState } from 'react'
import { ClothingItem } from '../types'

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
  const [imageData, setImageData] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageData(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!name || !category || !tempRange) return

    const cleanedRange = normalizedTempRange(tempRange)

    const newItem: ClothingItem = {
      id: crypto.randomUUID(), // ランダムなID
      name,
      category,
      tempRange: cleanedRange,
      image: imageData || undefined,
    }

    onAdd(newItem) // 親コンポーネントに新しい服を渡す

    // 入力欄をクリア
    setName('')
    setCategory('')
    setTempRange('')
    setImageData(null)
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <input
        placeholder="服の名前"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      >
        <option value="">カテゴリ</option>
        <option value="トップス">トップス</option>
        <option value="ボトムス">ボトムス</option>
        <option value="アウター">アウター</option>
        <option value="ワンピース・セットアップ">ワンピース・セットアップ</option>
        <option value="シューズ">シューズ</option>
        <option value="その他">その他</option>
      </select>
      <input
        placeholder="推奨気温（例：10〜18）"
        value={tempRange}
        onChange={e => setTempRange(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      {/*画像アップロード*/}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginRight: '0.5rem', marginTop: '0.5rem' }}
      />
      {/* 画像プレビュー */}
      {imageData && (
        <img
          src={imageData}
          alt="選択された服の画像"
          style={{ width: '80px', height: '80px', objectFit: 'cover', display: 'block', marginTop: '0.5rem' }}
        />
      )}
      <button onClick={handleSubmit}>登録</button>
    </div>
  )
}

export default ClothingForm
