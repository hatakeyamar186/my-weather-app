import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>提案が完了しました ✅</h1>
      <p>今日の服装が決まりましたか？</p>
      <button
        onClick={() => navigate('/')}
        style={{ marginTop: '1rem', padding: '0.5rem 1.2rem', fontSize: '1rem' }}
      >
        最初に戻る ↩
      </button>
    </div>
  );
};

export default ResultPage;
