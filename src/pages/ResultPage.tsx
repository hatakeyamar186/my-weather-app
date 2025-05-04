import { useLocation, useNavigate } from "react-router-dom";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state as { result: string };

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>ゲーム終了！</h1>
      <p>あなたの役は：{result}</p>
      <button onClick={handleRestart} style={{ fontSize: "24px", padding: "10px 20px" }}>
        もう一度プレイ
      </button>
    </div>
  );
};

export default ResultPage;
