import React from "react";
import sprites from "../utils/sprites.svg";

type props = {
  piece: string;
};

export default function WhitePiece({ piece }: props) {
  return (
    <div className="square">
      <svg>
        <use xlinkHref={`${sprites}#${piece}`} />
      </svg>
    </div>
  );
}
