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
  getID: () => number;
  getPlayer: () => Players;
  setPostion: (position: Position) => void;
  getPosition: () => Position;
  killedAPiece: () => void;
  getKills: () => number;
  canMove: (squares: BoardSquare[][]) => Position[];
}
