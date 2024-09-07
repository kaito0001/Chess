import { Position, Teams } from "../utils/types_enums";
import Piece from "./Piece";
import Square from "./Square";

export default class King extends Piece {
  constructor(team: Teams, position: Position) {
    super(team, position);
  }

  override validMoves(board: Square[][]): Position[] {
    const { x, y } = this.position;
    const team = this._team;

    let movements: Position[] = [];

    function setForbiddenSquares(): Position[] {
      let result: Position[] = [];

      for (const row of board) {
        for (const square of row) {
          square.currentPiece?.pressureOnKing(board, team).map(({ x, y }) => {
            result.push({ x, y });
          });
        }
      }

      return result;
    }

    const forbiddenSquares: Position[] = setForbiddenSquares();

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
      } else {
        if (forbiddenSquares.find((pos) => pos.x === newX && pos.y === newY)) {
          continue;
        }

        movements.push({ x: newX, y: newY });
      }
    }
    return movements;
  }

  override pressureOnKing(board: Square[][], team: Teams): Position[] {
    if (team === this._team) return [];
    const { x, y } = this.position;

    const attacks = [];

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
      const newX = x + dx;
      const newY = y + dy;

      attacks.push({ x: newX, y: newY });
    }
    return attacks;
  }

  isChecked(board: Square[][]): boolean {
    const team = this._team;
    function setForbiddenSquares(): Position[] {
      let result: Position[] = [];

      for (const row of board) {
        for (const square of row) {
          square.currentPiece?.pressureOnKing(board, team).map(({ x, y }) => {
            result.push({ x, y });
          });
        }
      }

      return result;
    }

    const forbiddenSquares: Position[] = setForbiddenSquares();

    if (
      forbiddenSquares.find(
        (pos) => pos.x === this._position.x && pos.y === this._position.y
      )
    ) {
      return true;
    }
    return false;
  }
}
