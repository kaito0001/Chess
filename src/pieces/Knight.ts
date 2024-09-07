import { Position, Teams } from "../utils/types_enums";
import Piece from "./Piece";
import Square from "./Square";

export default class Knight extends Piece {
  constructor(team: Teams, position: Position) {
    super(team, position);
  }

  override validMoves(board: Square[][]): Position[] {
    const { x, y } = this.position;

    let movements: Position[] = [];

    const directions = [
      { dx: -2, dy: 1 }, // 2 up 1 right
      { dx: -2, dy: -1 }, // 2 up 1 left
      { dx: 2, dy: 1 }, // 2 down 1 right
      { dx: 2, dy: -1 }, // 2 down 1 left
      { dx: -1, dy: 2 }, // 1 up 2 right
      { dx: -1, dy: -2 }, // 1 up 2 left
      { dx: 1, dy: 2 }, // 1 down 2 right
      { dx: 1, dy: -2 }, // 1 down 2 left
    ];

    for (const { dx, dy } of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX < 0 ||
        newX > 7 ||
        newY < 0 ||
        newY > 7 ||
        board[newX][newY].isFriend(this.team)
      ) {
        continue;
      } else if (board[newX][newY].isEnemy(this.team)) {
        movements.push({ x: newX, y: newY });
      } else {
        movements.push({ x: newX, y: newY });
      }
    }
    return movements;
  }

  override pressureOnKing(board: Square[][], team: Teams): Position[] {
    if (team === this._team) return [];
    const { x, y } = this.position;

    let attacks: Position[] = [];

    const directions = [
      { dx: -2, dy: 1 }, // 2 up 1 right
      { dx: -2, dy: -1 }, // 2 up 1 left
      { dx: 2, dy: 1 }, // 2 down 1 right
      { dx: 2, dy: -1 }, // 2 down 1 left
      { dx: -1, dy: 2 }, // 1 up 2 right
      { dx: -1, dy: -2 }, // 1 up 2 left
      { dx: 1, dy: 2 }, // 1 down 2 right
      { dx: 1, dy: -2 }, // 1 down 2 left
    ];

    for (const { dx, dy } of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
        break;
      } else {
        attacks.push({ x: newX, y: newY });
      }
    }
    return attacks;
  }
}
