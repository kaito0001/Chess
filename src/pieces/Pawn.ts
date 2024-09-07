import { Position, Teams } from "../utils/types_enums";
import Piece from "./Piece";
import Square from "./Square";

export default class Pawn extends Piece {
  private _canEnPassant: boolean;
  private _canBeEnPassanted: boolean;
  private _promote: boolean;

  constructor(team: Teams, position: Position) {
    super(team, position);
    this._canEnPassant = false;
    this._canBeEnPassanted = false;
    this._promote = false;
  }

  override validMoves(board: Square[][]): Position[] {
    const { x, y } = this.position;

    let movements: Position[] = [];

    const directions =
      this.team === Teams.white
        ? [
            { dx: -1, dy: 0 }, // up
            { dx: -1, dy: 1 }, // north-east
            { dx: -1, dy: -1 }, // north-west
          ]
        : [
            { dx: 1, dy: 0 }, // down
            { dx: 1, dy: 1 }, // south-east
            { dx: 1, dy: -1 }, // south-west
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
        if (newY !== y) {
          movements.push({ x: newX, y: newY });
        }
      } else {
        if (newY === y) {
          movements.push({ x: newX, y: newY });
        }
      }
    }

    // double-step
    if (
      this.team === Teams.white &&
      x === 6 &&
      board[x - 1][y].isEmpty() &&
      board[x - 2][y].isEmpty()
    ) {
      movements.push({ x: x - 2, y: y });
    }

    if (
      this.team === Teams.black &&
      x === 1 &&
      board[x + 1][y].isEmpty() &&
      board[x + 2][y].isEmpty()
    ) {
      movements.push({ x: x + 2, y: y });
    }

    return movements;
  }

  override pressureOnKing(board: Square[][], team: Teams): Position[] {
    if (team === this._team) return [];
    const { x, y } = this.position;

    let attacks: Position[] = [];

    const directions =
      this.team === Teams.white
        ? [
            { dx: -1, dy: 0 }, // up
            { dx: -1, dy: 1 }, // north-east
            { dx: -1, dy: -1 }, // north-west
          ]
        : [
            { dx: 1, dy: 0 }, // down
            { dx: 1, dy: 1 }, // south-east
            { dx: 1, dy: -1 }, // south-west
          ];

    for (const { dx, dy } of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
        continue;
      } else if (board[newX][newY].isFriend(this.team)) {
        attacks.push({ x: newX, y: newY });
      } else if (board[newX][newY].isEnemy(this.team)) {
        if (newY !== y) {
          attacks.push({ x: newX, y: newY });
        }
      } else {
        if (newY !== y) {
          attacks.push({ x: newX, y: newY });
        }
      }
    }

    return attacks;
  }

  set canEnPassant(canEnPassant: boolean) {
    this._canEnPassant = canEnPassant;
  }

  get canEnPassant(): boolean {
    return this._canEnPassant;
  }

  set canBeEnPassanted(canBeEnPassanted: boolean) {
    this._canBeEnPassanted = canBeEnPassanted;
  }

  get canBeEnPassanted(): boolean {
    return this._canBeEnPassanted;
  }
}
