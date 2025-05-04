import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandCard } from "@/components/types"; 
import Hand from "@/components/Hand";

const GamePage: React.FC = () => {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [hand, setHand] = useState<HandCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasExchanged, setHasExchanged] = useState<boolean>(false); // 交換したかどうか
  const navigate = useNavigate();

  useEffect(() => {
    // ゲーム開始時にデッキ作成 → カード配布
    const startGame = async () => {
      try {
        // 新しいデッキを作成（シャッフル）
        const deckRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const deckData = await deckRes.json();
        setDeckId(deckData.deck_id);

        // 5枚カードを引く
        const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=5`);
        const drawData = await drawRes.json();

        // カードにselected=falseを追加
        const newCards: HandCard[] = drawData.cards.map((card: any) => ({
          code: card.code,
          image: card.image,
          suit: card.suit,
          value: card.value,
          selected: false,
        }));

        // 交換されないカードはそのまま、新しいカードに置き換え
      const updatedHand: HandCard[] = [];
      let newCardIndex = 0;
      for (const card of hand) {
        if (card.selected) {
          updatedHand.push(card);
        } else {
          updatedHand.push(newCards[newCardIndex]);
          newCardIndex++;
        }
      }
        setHand(newCards);
        setIsLoading(false);
      } catch (error) {
        console.error("エラー発生:", error);
      }
    };

    startGame();
  }, []);

  const judgeHand = (hand: HandCard[]): string => {
    const valueCount: { [key: string]: number } = {};
  
    hand.forEach(card => {
      valueCount[card.value] = (valueCount[card.value] || 0) + 1;
    });
  
    const counts = Object.values(valueCount);
  
    const hasThree = counts.includes(3);
    const hasTwo = counts.filter(count => count === 2).length;
    const hasFour = counts.includes(4);
  
    if (hasFour) return "フォーカード";
    if (hasThree && hasTwo === 1) return "フルハウス";
    if (hasThree) return "スリーカード";
    if (hasTwo === 2) return "ツーペア";
    if (hasTwo === 1) return "ワンペア";
  
    return "役なし";
  };  

  const toggleSelectCard = (index: number) => {
    setHand(prevHand => 
      prevHand.map((card, i) => 
        i === index ? { ...card, selected: !card.selected } : card
      )
    );
  };

  const handleExchange = async () => {
    if (!deckId) return;

    const replaceCount = hand.filter(card => !card.selected).length;
    if (replaceCount === 0) {
      alert("交換するカードがありません！");
      return;
    }

    try {
      const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${replaceCount}`);
      const drawData = await drawRes.json();
      const newCards = drawData.cards.map((card: any) => ({
        code: card.code,
        image: card.image,
        suit: card.suit,
        value: card.value,
        selected: false,
      }));

      // 交換されないカードはそのまま、新しいカードに置き換え
      const updatedHand: HandCard[] = hand.map(card => {
        if (card.selected) {
          return card;
        } else {
          const newCard = newCards.shift(); // 交換用の新カードを順番に使う
          if (!newCard) {
            throw new Error("交換用のカードが足りない！");
          }
          return newCard;
        }
      });

      setHand(updatedHand);
      setHasExchanged(true); // 交換したらもうボタンは使えない
      const handResult = judgeHand(updatedHand); // ← 手札から役を判定！
      navigate('/result', { state: { result: handResult } }); // ← 結果画面に遷移！
    } catch (error) {
      console.error("交換エラー:", error);
    }
  };


  if (isLoading) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>カード配布中...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>あなたの手札</h2>
      <Hand cards={hand} onSelectCard={toggleSelectCard} />

      {/* 交換ボタン */}
      {!hasExchanged && (
        <button
          onClick={handleExchange}
          style={{ marginTop: "20px", fontSize: "20px", padding: "10px 20px" }}
        >
          選択していないカードを交換
        </button>
      )}
    </div>
  );
};

export default GamePage;
