import Bishop from "./pieces/Bishop";
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Piece from "./pieces/Piece";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";
import King from "./pieces/King";
import Square from "./pieces/Square";
import { Teams } from "./utils/types_enums";

export const initialBlackTeam: Piece[] = [
  new Rook(Teams.black, { x: 0, y: 0 }),
  new Knight(Teams.black, { x: 0, y: 1 }),
  new Bishop(Teams.black, { x: 0, y: 2 }),
  new Queen(Teams.black, { x: 0, y: 3 }),
  new King(Teams.black, { x: 0, y: 4 }), // not implemented
  new Bishop(Teams.black, { x: 0, y: 5 }),
  new Knight(Teams.black, { x: 0, y: 6 }),
  new Rook(Teams.black, { x: 0, y: 7 }),

  new Pawn(Teams.black, { x: 1, y: 0 }),
  new Pawn(Teams.black, { x: 1, y: 1 }),
  new Pawn(Teams.black, { x: 1, y: 2 }),
  new Pawn(Teams.black, { x: 1, y: 3 }),
  new Pawn(Teams.black, { x: 1, y: 4 }),
  new Pawn(Teams.black, { x: 1, y: 5 }),
  new Pawn(Teams.black, { x: 1, y: 6 }),
  new Pawn(Teams.black, { x: 1, y: 7 }),
];

export const initialWhiteTeam: Piece[] = [
  new Pawn(Teams.white, { x: 6, y: 0 }),
  new Pawn(Teams.white, { x: 6, y: 1 }),
  new Pawn(Teams.white, { x: 6, y: 2 }),
  new Pawn(Teams.white, { x: 6, y: 3 }),
  new Pawn(Teams.white, { x: 6, y: 4 }),
  new Pawn(Teams.white, { x: 6, y: 5 }),
  new Pawn(Teams.white, { x: 6, y: 6 }),
  new Pawn(Teams.white, { x: 6, y: 7 }),

  new Rook(Teams.white, { x: 7, y: 0 }),
  new Knight(Teams.white, { x: 7, y: 1 }),
  new Bishop(Teams.white, { x: 7, y: 2 }),
  new Queen(Teams.white, { x: 7, y: 3 }),
  new King(Teams.white, { x: 7, y: 4 }), // not implemented
  new Bishop(Teams.white, { x: 7, y: 5 }),
  new Knight(Teams.white, { x: 7, y: 6 }),
  new Rook(Teams.white, { x: 7, y: 7 }),
];

export const initialBoard: Square[][] = [
  [
    new Square(initialBlackTeam[0]),
    new Square(initialBlackTeam[1]),
    new Square(initialBlackTeam[2]),
    new Square(initialBlackTeam[3]),
    new Square(initialBlackTeam[4]),
    new Square(initialBlackTeam[5]),
    new Square(initialBlackTeam[6]),
    new Square(initialBlackTeam[7]),
  ],
  [
    new Square(initialBlackTeam[8]),
    new Square(initialBlackTeam[9]),
    new Square(initialBlackTeam[10]),
    new Square(initialBlackTeam[11]),
    new Square(initialBlackTeam[12]),
    new Square(initialBlackTeam[13]),
    new Square(initialBlackTeam[14]),
    new Square(initialBlackTeam[15]),
  ],

  [
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
  ],
  [
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
  ],
  [
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
  ],
  [
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
    new Square(),
  ],

  [
    new Square(initialWhiteTeam[0]),
    new Square(initialWhiteTeam[1]),
    new Square(initialWhiteTeam[2]),
    new Square(initialWhiteTeam[3]),
    new Square(initialWhiteTeam[4]),
    new Square(initialWhiteTeam[5]),
    new Square(initialWhiteTeam[6]),
    new Square(initialWhiteTeam[7]),
  ],
  [
    new Square(initialWhiteTeam[8]),
    new Square(initialWhiteTeam[9]),
    new Square(initialWhiteTeam[10]),
    new Square(initialWhiteTeam[11]),
    new Square(initialWhiteTeam[12]),
    new Square(initialWhiteTeam[13]),
    new Square(initialWhiteTeam[14]),
    new Square(initialWhiteTeam[15]),
  ],
];
