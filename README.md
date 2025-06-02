# 服装ガイドアプリ

このアプリは、現在地の天気・気温に合わせて「あなたのクローゼット」に登録した服の中から最適な服をおすすめしてくれるWebアプリです。  
React + TypeScript + Viteで開発されています。

---

## 主な機能

- **現在地の天気・気温の自動取得**  
  位置情報からOpenWeatherMap APIを使って天気と気温を取得します。

- **服の登録（クローゼット機能）**  
  服の名前・カテゴリ・推奨気温・画像を登録して自分だけのクローゼットを作れます。

- **気温に合った服のおすすめ表示**  
  その日の気温に合う服を、登録したクローゼットの中から自動でおすすめ（画像付き）表示します。

- **服の削除**  
  クローゼットから不要な服を削除できます。

---

## 使い方

1. **クローゼットに服を登録**  
   「あなたのクローゼット」ページで服の名前・カテゴリ・推奨気温（最低・最高）・画像を入力して登録します。

2. **ホーム画面で天気を取得**  
   ホーム画面にアクセスすると、現在地の天気・気温が自動で表示されます。

3. **おすすめの服を確認**  
   気温に合った服が「あなたの服からのおすすめ」欄に画像付きで表示されます。

---

## 技術スタック

- React
- TypeScript
- Vite
- React Router
- OpenWeatherMap API（天気取得）
- Nominatim（位置情報の地名変換）
- localStorage（服データの保存）

---

## 開発・起動方法

```bash
# リポジトリをクローン
git clone <このリポジトリのURL>
cd ts-react-template-main

# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev

---

ディレクトリ構成
src/
├──components/
│  ├──clothing_list.css
│  ├──ClothingForm.tsx
│  ├──ClothingList.tsx
│  ├──ClothingSuggestion.tsx
│  └──WeatherDisplay.tsx
├──pages
│  ├──ClosetPage.tsx
│  ├──Home.tsx
│  ├──ResultPage.tsx
│  └──StartPage.tsx
├──App.tsx
├──index.css
├──main.tsx
├──types.ts
├──vite-env.d.ts
├──tsconfig.json
├──tsconfig.node.json
└──vite.config.ts