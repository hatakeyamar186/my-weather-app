import React from "react";

interface CardProps {
  image: string;
  selected: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ image, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: selected ? "2px solid blue" : "1px solid gray",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      <img src={image} alt="card" width="100" />
    </div>
  );
};

export default Card;
