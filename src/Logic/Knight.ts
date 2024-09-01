import { Players, Position } from "../utils/interfaces_enums";
import BoardSquare from "./BoardSquare";
import Piece from "./Piece";

export default class Knight extends Piece {
  constructor(player: Players, position: Position) {
    super(player, position);
    this.setName();
  }

  setName(): void {
    this.name = `${this.player === Players.white ? "white" : "black"}-knight`;
  }

  canMove(squares: BoardSquare[][]): Position[] {
    let result: Position[] = [];
    const { x, y } = this.position;

    // ? +1 x
    // +2 y
    if (y < 6 && x < 7 && !squares[x + 1][y + 2].isFriend(this.player))
      result.push({ x: x + 1, y: y + 2 });
    // -2 y
    if (y > 1 && x < 7 && !squares[x + 1][y - 2].isFriend(this.player))
      result.push({ x: x + 1, y: y - 2 });

    // ? -1 x
    // +2 y
    if (y < 6 && x > 0 && !squares[x - 1][y + 2].isFriend(this.player))
      result.push({ x: x - 1, y: y + 2 });
    // -2 y
    if (y > 1 && x > 0 && !squares[x - 1][y - 2].isFriend(this.player))
      result.push({ x: x - 1, y: y - 2 });

    // ? +2 x
    // +1 y
    if (y < 7 && x < 6 && !squares[x + 2][y + 1].isFriend(this.player))
      result.push({ x: x + 2, y: y + 1 });
    // -1 y
    if (y > 0 && x < 6 && !squares[x + 2][y - 1].isFriend(this.player))
      result.push({ x: x + 2, y: y - 1 });

    // ? -2 x
    // +1 y
    if (y < 7 && x > 1 && !squares[x - 2][y + 1].isFriend(this.player))
      result.push({ x: x - 2, y: y + 1 });
    // -1 y
    if (y > 0 && x > 1 && !squares[x - 2][y - 1].isFriend(this.player))
      result.push({ x: x - 2, y: y - 1 });

    return result;
  }
}
