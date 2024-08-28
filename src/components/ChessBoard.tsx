import React, { useState } from "react";
import sprites from "../utils/sprites.svg";

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
            return (
              <div className="square" id={`${i}-${j}`} key={`${i}${j}`}>
                <svg style={{ transform: "rotate(180deg)" }}>
                  <use xlinkHref={`${sprites}#${piece}`} />
                </svg>
              </div>
            );
          } else {
            return (
              <div className="square" id={`${i}-${j}`} key={`${i}${j}`}>
                <svg>
                  <use xlinkHref={`${sprites}#${piece}`} />
                </svg>
              </div>
            );
          }
        })
      )}
      {/* <div className="square" id="1">
        <svg>
          <use xlinkHref={`${sprites}#white-rook`} />
        </svg>
      </div>
      <div className="square" id="2">
        2
      </div>
      <div className="square" id="3">
        2
      </div>
      <div className="square" id="4">
        2
      </div>
      <div className="square" id="5">
        2
      </div>
      <div className="square" id="6">
        2
      </div>
      <div className="square" id="7">
        2
      </div>
      <div className="square" id="8">
        2
      </div>
      <div className="square" id="9">
        2
      </div>
      <div className="square" id="10">
        1
      </div>
      <div className="square" id="11">
        1
      </div>
      <div className="square" id="12">
        1
      </div>
      <div className="square" id="13">
        1
      </div>
      <div className="square" id="14">
        1
      </div>
      <div className="square" id="15">
        1
      </div>
      <div className="square" id="16">
        1
      </div>
      <div className="square" id="17">
        1
      </div>
      <div className="square" id="18">
        1
      </div>
      <div className="square" id="19">
        1
      </div>
      <div className="square" id="20">
        1
      </div>
      <div className="square" id="21">
        1
      </div>
      <div className="square" id="22">
        1
      </div>
      <div className="square" id="23">
        1
      </div>
      <div className="square" id="24">
        1
      </div>
      <div className="square" id="25">
        1
      </div>
      <div className="square" id="26">
        1
      </div>
      <div className="square" id="27">
        1
      </div>
      <div className="square" id="28">
        1
      </div>
      <div className="square" id="29">
        1
      </div>
      <div className="square" id="30">
        1
      </div>
      <div className="square" id="31">
        1
      </div>
      <div className="square" id="32">
        1
      </div>
      <div className="square" id="33">
        1
      </div>
      <div className="square" id="34">
        1
      </div>
      <div className="square" id="35">
        1
      </div>
      <div className="square" id="36">
        1
      </div>
      <div className="square" id="37">
        1
      </div>
      <div className="square" id="38">
        1
      </div>
      <div className="square" id="39">
        1
      </div>
      <div className="square" id="40">
        1
      </div>
      <div className="square" id="41">
        1
      </div>
      <div className="square" id="42">
        1
      </div>
      <div className="square" id="43">
        1
      </div>
      <div className="square" id="44">
        1
      </div>
      <div className="square" id="45">
        1
      </div>
      <div className="square" id="46">
        1
      </div>
      <div className="square" id="47">
        1
      </div>
      <div className="square" id="48">
        1
      </div>
      <div className="square" id="49">
        1
      </div>
      <div className="square" id="50">
        1
      </div>
      <div className="square" id="51">
        1
      </div>
      <div className="square" id="52">
        1
      </div>
      <div className="square" id="53">
        1
      </div>
      <div className="square" id="54">
        1
      </div>
      <div className="square" id="55">
        1
      </div>
      <div className="square" id="56">
        1
      </div>
      <div className="square" id="57">
        1
      </div>
      <div className="square" id="58">
        1
      </div>
      <div className="square" id="59">
        1
      </div>
      <div className="square" id="60">
        1
      </div>
      <div className="square" id="61">
        1
      </div>
      <div className="square" id="62">
        1
      </div>
      <div className="square" id="63">
        1
      </div>
      <div className="square" id="64">
        1
      </div> */}
    </div>
  );
}
