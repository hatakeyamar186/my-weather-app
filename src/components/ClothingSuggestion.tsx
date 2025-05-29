interface Props {
    temperature: number;
  }
  
  const suggestClothes = (temp: number): string => {
    if (temp < 6) return 'ダウンジャケット、厚手コート、手袋、マフラー、帽子';
    if (temp < 9) return 'ダウンジャケット、厚手コート、セーター、手袋';
    if (temp < 12) return 'コート、ニット、マフラー';
    if (temp < 16) return 'ジャケット、薄手セーター';
    if (temp < 20) return '薄手ジャケット、カーディガン、パーカー';
    if (temp < 24) return '長袖シャツ、カーディガン、薄手シャツ、ワンピース';
    if (temp < 28) return '半袖Tシャツ、ポロシャツ、スカート';
    return 'Tシャツ、ショートパンツ、タンクトップ';

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
  