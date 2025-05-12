interface StartPageProps {
    onStart: () => void;
  }
  
  const StartPage = ({ onStart }: StartPageProps) => {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>服装ガイドへようこそ 👕</h1>
        <p>このアプリは、現在の天気に応じて今日のおすすめの服装を提案します。</p>
        <p>現在地の天気をもとに提案します。</p>
        <button 
          onClick={onStart} 
          style={{ fontSize: '1.2rem', padding: '0.5rem 1.5rem', marginTop: '1.5rem' }}
        >
          はじめる ▶
        </button>
      </div>
    );
  };
  
  export default StartPage;
  