import React, { useEffect, useState } from "react";
import {
  initialBlackTeam,
  initialWhiteTeam,
  initialBoard,
} from "../InitialData";
import BoardSquare from "./BoardSquare";
import { Position, Teams } from "../utils/types_enums";
import King from "../pieces/King";
import Pawn from "../pieces/Pawn";
import Square from "../pieces/Square";
import Queen from "../pieces/Queen";
import Rook from "../pieces/Rook";
import Knight from "../pieces/Knight";
import Bishop from "../pieces/Bishop";

export default function Board() {
  const [whiteTeam, setWhiteTeam] = useState(initialWhiteTeam);
  const [blackTeam, setBlackTeam] = useState(initialBlackTeam);
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(Teams.white);
  const [choosedPosition, setChoosedPosition] = useState<Position>({
    x: -1,
    y: -1,
  });
  const [validMoves, setValidMoves] = useState<Position[]>([]);

  function deepCloneWithMethods(obj: any): any {
    // If the object is null or not an object, return it (base case)
    if (obj === null || typeof obj !== "object") return obj;

    // If the object is an array, deep clone each element
    if (Array.isArray(obj)) {
      return obj.map(deepCloneWithMethods);
    }

    // Create a new object with the same prototype as the original object (to preserve methods)
    const clone = Object.create(Object.getPrototypeOf(obj));

    // Recursively deep clone each property
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepCloneWithMethods(obj[key]);
      }
    }

    return clone;
  }

  function isKingChecked(board: Square[][]) {
    let currentKing!: King;
    board.map((row) =>
      row.map((square) => {
        if (
          square.currentPiece?.team === currentPlayer &&
          square.currentPiece.constructor.name === "King"
        ) {
          currentKing = square.currentPiece as King;
        }
      })
    );

    if (currentKing.isChecked(board)) {
      return true;
    }
    return false;
  }

  function protectionMovements(checkPos: Position) {
    let currentKing!: Position;
    board.map((row) =>
      row.map((square) => {
        if (
          square.currentPiece?.team === currentPlayer &&
          square.currentPiece.constructor.name === "King"
        ) {
          currentKing = square.currentPiece.position;
        }
      })
    );
    const newBoard = deepCloneWithMethods(board) as Square[][];

    const currentPiece = newBoard[checkPos.x][checkPos.y].currentPiece;

    let result: Position[] = [];

    for (const pos of newBoard[checkPos.x][checkPos.y].currentPiece!.validMoves(
      newBoard
    )) {
      const otherPosPiece = newBoard[pos.x][pos.y].currentPiece;
      newBoard[pos.x][pos.y].currentPiece = new Pawn(currentPlayer, {
        x: pos.x,
        y: pos.y,
      });

      newBoard[checkPos.x][checkPos.y] = new Square();

      if (!isKingChecked(newBoard)) result.push(pos);

      newBoard[pos.x][pos.y].currentPiece = otherPosPiece;
      newBoard[checkPos.x][checkPos.y].currentPiece = currentPiece;
    }

    return result;
  }

  useEffect(() => {
    if (!checkCheckMate()) {
      if (choosedPosition.x !== -1) {
        if (
          board[choosedPosition.x][choosedPosition.y].currentPiece!.constructor
            .name === "King"
        ) {
          const newValidMoves: Position[] =
            board[choosedPosition.x][
              choosedPosition.y
            ].currentPiece!.validMoves(board);
          setValidMoves(newValidMoves);
          return;
        }
        if (
          isKingChecked(board) &&
          board[choosedPosition.x][choosedPosition.y].currentPiece!.constructor
            .name !== "King"
        ) {
          if (protectionMovements(choosedPosition).length !== 0) {
            setValidMoves(protectionMovements(choosedPosition));
            return;
          }
          setValidMoves([]);
          setChoosedPosition({ x: -1, y: -1 });
          return;
        } else if (
          protectionMovements(choosedPosition).length !== 0 &&
          board[choosedPosition.x][choosedPosition.y].currentPiece!.constructor
            .name !== "King"
        ) {
          setValidMoves(protectionMovements(choosedPosition));

          return;
        }

        const newValidMoves: Position[] =
          board[choosedPosition.x][choosedPosition.y].currentPiece!.validMoves(
            board
          );
        setValidMoves(newValidMoves);
      }

      checkPawnPromotion();
    }
  }, [choosedPosition, board]);

  function checkPawnPromotion() {
    const newBoard = [...board];
    for (let i = 0; i < 8; i++) {
      // white promotion
      if (board[0][i].currentPiece?.constructor.name === "Pawn") {
        const userInput: number = Number(
          window.prompt(
            "Enter a number for promotion: (1: queen, 2: rook, 3: knight, 4: bishop"
          )
        );

        const newPiece =
          userInput === 1
            ? new Queen(Teams.white, { x: 0, y: i })
            : userInput === 2
            ? new Rook(Teams.white, { x: 0, y: i })
            : userInput === 3
            ? new Knight(Teams.white, { x: 0, y: i })
            : new Bishop(Teams.white, { x: 0, y: i });

        newBoard[0][i].currentPiece = newPiece;

        setBoard(newBoard);
        return;
      }

      // black promotion
      if (board[7][i].currentPiece?.constructor.name === "Pawn") {
        const userInput: number = Number(
          window.prompt(
            "Enter a number for promotion: (1: queen, 2: rook, 3: knight, 4: bishop"
          )
        );

        const newPiece =
          userInput === 1
            ? new Queen(Teams.black, { x: 7, y: i })
            : userInput === 2
            ? new Rook(Teams.black, { x: 7, y: i })
            : userInput === 3
            ? new Knight(Teams.black, { x: 7, y: i })
            : new Bishop(Teams.black, { x: 7, y: i });

        newBoard[7][i].currentPiece = newPiece;

        setBoard(newBoard);
        return;
      }
    }
  }

  function checkCheckMate(): boolean {
    if (!isKingChecked(board)) return false;

    let currentKing!: King;
    board.map((row) =>
      row.map((square) => {
        if (
          square.currentPiece?.team === currentPlayer &&
          square.currentPiece.constructor.name === "King"
        ) {
          currentKing = square.currentPiece as King;
        }
      })
    );

    if (currentKing.validMoves(board).length !== 0) return false;

    for (const row of board) {
      for (const square of row) {
        if (
          square.currentPiece?.team === currentKing.team &&
          protectionMovements({
            x: square.currentPiece.position.x,
            y: square.currentPiece.position.y,
          }).length !== 0
        ) {
          return false;
        }
      }
    }

    alert(`${currentPlayer === Teams.white ? "black" : "white"} won`);
    return true;
  }

  return (
    <div className="board">
      {board.map((row, i) =>
        row.map((square, j) => (
          <BoardSquare
            piece={square.currentPiece}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            board={board}
            setBoard={setBoard}
            key={`${i}-${j}`}
            squareX={i}
            squareY={j}
            choosedPosition={choosedPosition}
            setChoosedPosition={setChoosedPosition}
            validMoves={validMoves}
            setValidMoves={setValidMoves}
          />
        ))
      )}
    </div>
  );
}
