import { useNavigate} from 'react-router-dom';

interface StartPageProps {
    onStart: () => void;
  }
  
  const StartPage = ({ onStart }: StartPageProps) => {
    const navigate = useNavigate();

    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>服装ガイドへようこそ 👕</h1>
        <p>このアプリは、現在の天気に応じて今日のおすすめの服装を提案します。</p>
        <p>現在の天気をもとに提案します。</p>
        <button 
          onClick={onStart} 
          style={{ fontSize: '1.2rem', padding: '0.5rem 1.5rem', marginTop: '1.5rem' }}
        >
          はじめる ▶
        </button>

        <br />
        <button
          onClick={() => navigate('/closet')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1.2rem',
            fontSize: '1rem',
          }}
          >
            クローゼットを見る 👚
          </button>
      </div>
    );
  };
  
  export default StartPage;
  