import React from "react";
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
};

export default function BlackPiece({ piece }: props) {
  return (
    <div className="square">
      {/* {piece.getPosition().x + "  " + piece.getPosition().y} */}
      <svg style={{ transform: "rotate(180deg)" }}>
        <use xlinkHref={`${sprites}#${piece.getName()}`} />
      </svg>
    </div>
  );
}
