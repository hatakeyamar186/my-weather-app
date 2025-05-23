import { ClothingItem } from '../types'
import './clothing-list.css'

interface ClothingListProps {
  clothes: ClothingItem[]
  onDelete: (id: string) => void
}

const ClothingList = ({ clothes, onDelete }: ClothingListProps) => {
  if (clothes.length === 0) {
    return <p className="no-items">登録された服はありません。</p>
  }

  return (
    <div className="container">
      <ul className="card-list">
        {clothes.map(item => (
          <li key={item.id} className="card">
            {item.image && (
              <img
                src={item.image}
                alt={`${item.name}の画像`}
                className="card-image"
              />
            )}
            <div className="card-content">
              <div>
                <p className="card-title">{item.name}</p>
                <p className="card-subtext">
                  カテゴリ：{item.category}｜気温：{item.tempRange}
                </p>
              </div>
              <button
                onClick={() => onDelete(item.id)}
                className="card-delete"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClothingList
