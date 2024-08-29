import React from "react";
import sprites from "../utils/sprites.svg";

type props = {
  piece: string;
};

export default function BlackPiece({ piece }: props) {
  return (
    <div className="square">
      <svg style={{ transform: "rotate(180deg)" }}>
        <use xlinkHref={`${sprites}#${piece}`} />
      </svg>
    </div>
  );
}
