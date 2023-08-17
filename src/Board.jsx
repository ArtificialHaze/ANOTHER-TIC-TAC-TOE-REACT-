import React, { useEffect, useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState(null);

  const setSquareValue = (index) => {
    const newData = squares.map((square, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return square;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const win = calculateWinner(squares);

    if (win) {
      setWinner(win);
    }

    if (!win && !squares.filter((square) => !square).length) {
      setWinner("TIE");
    }
  }, []);

  return (
    <div>
      {!winner && <p>Hey, {currentPlayer}, it's your turn!</p>}
      {winner && winner !== "TIE" && (
        <p>Congratulations {winner} are a Winner! </p>
      )}
      {winner && winner === "TIE" && <p>It's A TIE!</p>}
      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <Square
              key={index}
              onClick={() => setSquareValue(index)}
              winner={winner}
              value={squares[index]}
            />
          ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default Board;
