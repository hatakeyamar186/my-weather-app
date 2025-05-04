import React from "react";

interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎴 ポーカーゲーム</h1>
      <p>5枚のカードで最高の役を目指せ！</p>
      <button onClick={onStart} style={{ fontSize: "24px", padding: "10px 20px" }}>
        ゲームスタート
      </button>
    </div>
  );
};

export default StartPage;
