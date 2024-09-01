import React, { useState } from "react";
import sprites from "../utils/sprites.svg";
import Piece from "../Logic/Piece";
import { Players, Position } from "../utils/interfaces_enums";
import BoardSquare from "../Logic/BoardSquare";

type props = {
  piece: Piece;
  isChoosedIndex: Position;
  setIsChoosedIndex: (postion: Position) => void;
  currentPlayer: Players;
  boardSquare: BoardSquare;
  availMoves: Position[];
};

export default function WhitePiece({
  piece,
  isChoosedIndex,
  setIsChoosedIndex,
  currentPlayer,
  boardSquare,
  availMoves,
}: props) {
  const [canSelect, setCanSelect] = useState<boolean>(false);

  function onSelect() {
    if (currentPlayer === piece.getPlayer()) {
      setCanSelect(true);
      setIsChoosedIndex(piece.getPosition());
    } else setCanSelect(false);
  }

  return (
    <div
      className={`${
        canSelect && isChoosedIndex === piece.getPosition()
          ? "selected_square"
          : availMoves.find((pos) => {
              console.log(pos === piece.getPosition());

              return (
                pos.x === piece.getPosition().x &&
                pos.y === piece.getPosition().y
              );
            })
          ? "square_move"
          : "square"
      }`}
      onClick={onSelect}
    >
      {/* {piece.getPosition().x + "  " + piece.getPosition().y} */}
      <svg>
        <use xlinkHref={`${sprites}#${piece.getName()}`} />
      </svg>
    </div>
  );
}
