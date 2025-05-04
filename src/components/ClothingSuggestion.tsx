interface Props {
    temperature: number;
  }
  
  const suggestClothes = (temp: number): string => {
    if (temp <= 10) return 'ダウンジャケット＋マフラー';
    if (temp <= 15) return 'コート＋長袖';
    if (temp <= 20) return 'パーカー';
    if (temp <= 25) return '長袖シャツ';
    return 'Tシャツ＋短パン';
  };
  
  const ClothingSuggestion = ({ temperature }: Props) => {
    const suggestion = suggestClothes(temperature);
  
    return (
      <div>
        <h3>おすすめの服装：</h3>
        <p>{suggestion}</p>
      </div>
    );
  };
  
  export default ClothingSuggestion;
  