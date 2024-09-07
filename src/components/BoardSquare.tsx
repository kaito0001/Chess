import React, { useState } from "react";
import Piece from "../pieces/Piece";
import { Position, Teams } from "../utils/types_enums";
import sprites from "../utils/sprites.svg";
import Square from "../pieces/Square";

type propsType = {
  piece: Piece | undefined;
  currentPlayer: Teams;
  setCurrentPlayer: (currentTeam: Teams) => void;
  board: Square[][];
  setBoard: (currentBoard: Square[][]) => void;
  squareX: number;
  squareY: number;
  choosedPosition: Position;
  setChoosedPosition: (currentPos: Position) => void;
  validMoves: Position[];
  setValidMoves: (currentValidMoves: Position[]) => void;
};

export default function BoardSquare({
  piece,
  currentPlayer,
  setCurrentPlayer,
  board,
  setBoard,
  squareX,
  squareY,
  choosedPosition,
  setChoosedPosition,
  validMoves,
  setValidMoves,
}: propsType) {
  const [canSelect, setCanSelect] = useState<boolean>(false);

  function onSelect() {
    if (
      choosedPosition.x !== -1 &&
      validMoves.find((pos) => pos.x === squareX && pos.y === squareY)
    ) {
      let newBoard = [...board];
      newBoard[squareX][squareY].currentPiece =
        board[choosedPosition.x][choosedPosition.y].currentPiece;
      newBoard[choosedPosition.x][choosedPosition.y] = new Square();

      newBoard[squareX][squareY].currentPiece!.position = {
        x: squareX,
        y: squareY,
      };

      setBoard(newBoard);
      setCurrentPlayer(
        currentPlayer === Teams.white ? Teams.black : Teams.white
      );
      setChoosedPosition({ x: -1, y: -1 });
      setValidMoves([]);
    } else if (currentPlayer === piece?.team) {
      setCanSelect(true);
      setChoosedPosition(piece.position);
    } else setCanSelect(false);
  }

  return (
    <div
      style={{
        backgroundColor: `${(squareX + squareY) % 2 === 0 ? "#aaa" : "#111"}`,
      }}
      className={`${
        canSelect && choosedPosition === piece?.position
          ? "selected_square"
          : validMoves.find((pos) => {
              return pos.x === squareX && pos.y === squareY;
            })
          ? "square_move"
          : "square"
      }`}
      onClick={onSelect}
    >
      <svg>
        <use xlinkHref={`${sprites}#${piece?.getName()}`} />
      </svg>
    </div>
  );
}
