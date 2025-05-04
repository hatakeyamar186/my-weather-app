import React from "react";
import Card from "./Card";  // カード1枚のコンポーネント
import { HandCard } from "@/components/types"; // 型ファイル（さっき作ったやつ）

interface HandProps {
  cards: HandCard[];
  onSelectCard: (index: number) => void;
}

const Hand: React.FC<HandProps> = ({ cards, onSelectCard }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {cards.map((card, index) => (
        <Card
          key={card.code}
          image={card.image}
          selected={card.selected}
          onClick={() => onSelectCard(index)}
        />
      ))}
    </div>
  );
};

export default Hand;
