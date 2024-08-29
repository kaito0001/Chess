import React, { useState } from "react";
import WhitePiece from "./WhitePiece";
import BlackPiece from "./BlackPiece";

const createInitPieces = (): string[][] => {
  let init: string[][] = [];

  for (let i: number = 0; i < 8; i++) {
    init[i] = [];
    for (let j: number = 0; j < 8; j++) {
      // initialize black pieces
      if (i === 0 && (j === 0 || j === 7)) init[i][j] = "black-rook";
      else if (i === 0 && (j === 1 || j === 6)) init[i][j] = "black-knight";
      else if (i === 0 && (j === 2 || j === 5)) init[i][j] = "black-bishop";
      else if (i === 0 && j === 4) init[i][j] = "black-king";
      else if (i === 0 && j === 3) init[i][j] = "black-queen";
      else if (i === 1) init[i][j] = "black-pawn";
      // initialize white pieces
      else if (i === 6) init[i][j] = "white-pawn";
      else if (i === 7 && (j === 0 || j === 7)) init[i][j] = "white-rook";
      else if (i === 7 && (j === 1 || j === 6)) init[i][j] = "white-knight";
      else if (i === 7 && (j === 2 || j === 5)) init[i][j] = "white-bishop";
      else if (i === 7 && j === 4) init[i][j] = "white-king";
      else if (i === 7 && j === 3) init[i][j] = "white-queen";
      else init[i][j] = "";
    }
  }

  return init;
};

let initPieces: string[][] = createInitPieces();

export default function ChessBoard() {
  const [pieces, setPieces] = useState(initPieces);

  return (
    <div className="board">
      {pieces.map((row, i) =>
        row.map((piece, j) => {
          if (piece.startsWith("black")) {
            return <BlackPiece piece={piece} key={`${i}${j}`} />;
          } else {
            return <WhitePiece piece={piece} key={`${i}${j}`} />;
          }
        })
      )}
    </div>
  );
}
