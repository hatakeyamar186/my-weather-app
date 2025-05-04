export interface Card {
    code: string;    // 例: "AS" (Ace of Spades)
    image: string;   // カードの画像URL
    suit: string;    // "SPADES" / "HEARTS"など
    value: string;   // "ACE", "2", ..., "KING"
  }
  
  export interface HandCard extends Card {
    selected: boolean; // プレイヤーが選択中かどうか
  }
  