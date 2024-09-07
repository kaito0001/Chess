import { Position, Teams } from "../utils/types_enums";
import Piece from "./Piece";
import Square from "./Square";

export default class Queen extends Piece {
  constructor(team: Teams, position: Position) {
    super(team, position);
  }

  override validMoves(board: Square[][]): Position[] {
    const { x, y } = this.position;

    let movements: Position[] = [];

    const directions = [
      { dx: -1, dy: 0 }, // up
      { dx: 1, dy: 0 }, // down
      { dx: 0, dy: 1 }, // right
      { dx: 0, dy: -1 }, // left
      { dx: -1, dy: 1 }, // north-east
      { dx: -1, dy: -1 }, // north-west
      { dx: 1, dy: 1 }, // south-east
      { dx: 1, dy: -1 }, // south-west
    ];

    for (const { dx, dy } of directions) {
      for (let i = 1; i < 8; i++) {
        const newX = x + dx * i;
        const newY = y + dy * i;

        if (
          newX < 0 ||
          newX > 7 ||
          newY < 0 ||
          newY > 7 ||
          board[newX][newY].isFriend(this.team)
        ) {
          break;
        } else if (board[newX][newY].isEnemy(this.team)) {
          movements.push({ x: newX, y: newY });
          break;
        } else {
          movements.push({ x: newX, y: newY });
        }
      }
    }
    return movements;
  }

  override pressureOnKing(board: Square[][], team: Teams): Position[] {
    if (team === this._team) return [];
    const { x, y } = this.position;

    let attacks: Position[] = [];

    const directions = [
      { dx: -1, dy: 0 }, // up
      { dx: 1, dy: 0 }, // down
      { dx: 0, dy: 1 }, // right
      { dx: 0, dy: -1 }, // left
      { dx: -1, dy: 1 }, // north-east
      { dx: -1, dy: -1 }, // north-west
      { dx: 1, dy: 1 }, // south-east
      { dx: 1, dy: -1 }, // south-west
    ];

    for (const { dx, dy } of directions) {
      for (let i = 1; i < 8; i++) {
        const newX = x + dx * i;
        const newY = y + dy * i;

        if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
          break;
        } else if (board[newX][newY].isFriend(this.team)) {
          attacks.push({ x: newX, y: newY });
          break;
        } else if (board[newX][newY].isEnemy(this.team)) {
          if (board[newX][newY].currentPiece?.getName().endsWith("king")) {
            attacks.push({ x: newX, y: newY });
          } else {
            attacks.push({ x: newX, y: newY });
            break;
          }
        } else {
          attacks.push({ x: newX, y: newY });
        }
      }
    }
    return attacks;
  }
}
