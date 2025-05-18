import { ClothingItem } from '../types'

interface ClothingListProps {
  clothes: ClothingItem[]
  onDelete: (id: string) => void
}

const ClothingList = ({ clothes, onDelete }: ClothingListProps) => {
  return (
    <ul>
      {clothes.map(item => (
        <li key={item.id} style={{ marginBottom: '0.5rem' }}>
          <div>
            ✅ {item.name}（{item.category}）｜{item.tempRange}
            <button
              onClick={() => onDelete(item.id)}
              style={{ marginLeft: '1rem' }}
            >
              削除
            </button>
          </div>

          {/* 画像がある場合は表示 */}
          {item.image && (
            <img
              src={item.image}
              alt={`${item.name}の画像`}
              style={{ width: '80px', height: '80px', objectFit: 'cover', marginTop: '0.3rem' }}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default ClothingList
