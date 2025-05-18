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
          ✅ {item.name}（{item.category}）｜{item.tempRange}
          <button
            onClick={() => onDelete(item.id)}
            style={{ marginLeft: '1rem' }}
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ClothingList
