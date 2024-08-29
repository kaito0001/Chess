import BoardSquare from "../Logic/BoardSquare";

export type Position = {
  x: number;
  y: number;
};

export enum Players {
  none,
  white,
  black,
}

export interface PieceInterface {
  setName: () => void;
  getName: () => string;
  getPlayer: () => number;
  setPostion: (position: Position) => void;
  getPosition: () => Position;
  killedAPiece: () => void;
  getKills: () => number;
  canMove: (squares: BoardSquare[][]) => Position[];
}
