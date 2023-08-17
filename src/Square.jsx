import React from "react";

const Square = ({ value, onClick, winner }) => {
  if (!value) {
    return (
      <button
        className="square"
        onClick={onClick}
        disabled={Boolean(winner)}
      ></button>
    );
  }

  return (
    <button className={`square square_${value}`} disabled>
      {value}
    </button>
  );
};

export default Square;
