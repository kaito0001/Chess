import React, { useEffect, useState } from "react";
import WhitePiece from "./WhitePiece";
import BlackPiece from "./BlackPiece";
import BoardSquare from "../Logic/BoardSquare";
import Piece from "../Logic/Piece";
import Rook from "../Logic/Rook";
import { Players, Position } from "../utils/interfaces_enums";
import Knight from "../Logic/Knight";
import Bishop from "../Logic/Bishop";
import King from "../Logic/King";
import Queen from "../Logic/Queen";
import Pawn from "../Logic/Pawn";

const createBoardSquares = (): BoardSquare[][] => {
  let init: BoardSquare[][] = [];

  for (let i: number = 0; i < 8; i++) {
    init[i] = [];
  }

  return init;
};

let initSquares: BoardSquare[][] = createBoardSquares();

const createInitPieces = (): Piece[][] => {
  let init: Piece[][] = [];

  for (let i: number = 0; i < 8; i++) {
    init[i] = [];
    let newPiece: Piece;
    for (let j: number = 0; j < 8; j++) {
      // initialize black pieces
      if (i === 0 && (j === 0 || j === 7)) {
        newPiece = new Rook(Players.black, { x: i, y: j });
      } else if (i === 0 && (j === 1 || j === 6)) {
        newPiece = new Knight(Players.black, { x: i, y: j });
      } else if (i === 0 && (j === 2 || j === 5)) {
        newPiece = new Bishop(Players.black, { x: i, y: j });
      } else if (i === 0 && j === 4) {
        newPiece = new King(Players.black, { x: i, y: j });
      } else if (i === 0 && j === 3) {
        newPiece = new Queen(Players.black, { x: i, y: j });
      } else if (i === 1) {
        newPiece = new Pawn(Players.black, { x: i, y: j });
      }
      // initialize white pieces
      else if (i === 6) {
        newPiece = new Pawn(Players.white, { x: i, y: j });
      } else if (i === 7 && (j === 0 || j === 7)) {
        newPiece = new Rook(Players.white, { x: i, y: j });
      } else if (i === 7 && (j === 1 || j === 6)) {
        newPiece = new Knight(Players.white, { x: i, y: j });
      } else if (i === 7 && (j === 2 || j === 5)) {
        newPiece = new Bishop(Players.white, { x: i, y: j });
      } else if (i === 7 && j === 4) {
        newPiece = new King(Players.white, { x: i, y: j });
      } else if (i === 7 && j === 3) {
        newPiece = new Queen(Players.white, { x: i, y: j });
      } else newPiece = new Pawn(Players.none, { x: i, y: j });

      init[i][j] = newPiece;
      initSquares[i][j] = new BoardSquare(newPiece);
    }
  }

  return init;
};

let initPieces: Piece[][] = createInitPieces();

export default function ChessBoard() {
  const [pieces, setPieces] = useState(initPieces);
  const [squares, setSquares] = useState(initSquares);
  const [isChoosedIndex, setIsChoosedIndex] = useState<Position>({
    x: -1,
    y: -1,
  });
  const [currentPlayer, setCurrentPlayer] = useState<Players>(Players.white);
  const [availMoves, setAvailMoves] = useState<Position[]>([]);

  useEffect(() => {
    if (isChoosedIndex.x === -1) return;

    const currentMoves: Position[] =
      pieces[isChoosedIndex.x][isChoosedIndex.y].canMove(squares);

    console.log(isChoosedIndex.x, isChoosedIndex.y);

    setAvailMoves(currentMoves);
    console.log(currentMoves);
  }, [isChoosedIndex]);

  return (
    <div className="board">
      {pieces.map((row, i) =>
        row.map((piece, j) => {
          if (piece.getName().startsWith("black")) {
            return (
              <BlackPiece
                piece={piece}
                isChoosedIndex={isChoosedIndex}
                setIsChoosedIndex={setIsChoosedIndex}
                currentPlayer={currentPlayer}
                boardSquare={squares[i][j]}
                key={`${i}${j}`}
              />
            );
          } else {
            return (
              <WhitePiece
                availMoves={availMoves}
                piece={piece}
                isChoosedIndex={isChoosedIndex}
                setIsChoosedIndex={setIsChoosedIndex}
                currentPlayer={currentPlayer}
                boardSquare={squares[i][j]}
                key={`${i}${j}`}
              />
            );
          }
        })
      )}
    </div>
  );
}
