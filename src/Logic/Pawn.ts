import { Players, Position } from "../utils/interfaces_enums";
import BoardSquare from "./BoardSquare";
import Piece from "./Piece";

export default class Pawn extends Piece {
  constructor(player: Players, position: Position) {
    super(player, position);
    this.setName();
  }

  setName(): void {
    this.name = `${this.player === Players.white ? "white" : "black"}-pawn`;
  }

  canMove(squares: BoardSquare[][]): Position[] {
    let result: Position[] = [];
    const { x, y } = this.position;

    // can go up???
    if (y < 7 && squares[x][y + 1].isEmpty()) result.push({ x, y: y + 1 });

    // can go north-east???
    if (x < 7 && y < 7 && squares[x + 1][y + 1].isEnemy(this.player))
      result.push({ x: x + 1, y: y + 1 });

    // can go north-west???
    if (x > 0 && y < 7 && squares[x - 1][y + 1].isEnemy(this.player))
      result.push({ x: x - 1, y: y + 1 });

    return result;
  }
}
