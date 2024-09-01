import { Players, Position } from "../utils/interfaces_enums";
import BoardSquare from "./BoardSquare";
import Piece from "./Piece";

export default class Queen extends Piece {
  constructor(player: Players, position: Position) {
    super(player, position);
    this.setName();
  }

  setName(): void {
    this.name = `${this.player === Players.white ? "white" : "black"}-queen`;
  }

  canMove(squares: BoardSquare[][]): Position[] {
    let result: Position[] = [];
    const { x, y } = this.position;

    // can go up???
    for (let i: number = 1; i < 7; i++) {
      if (y + i > 7 || squares[x][y + i].isFriend(this.player)) break;
      else if (squares[x][y + i].isEnemy(this.player)) {
        result.push({ x, y: y + i });
        break;
      } else result.push({ x, y: y + i });
    }

    // can go down???
    for (let i: number = 1; i < 7; i++) {
      if (y - i < 0 || squares[x][y - i].isFriend(this.player)) break;
      else if (squares[x][y - i].isEnemy(this.player)) {
        result.push({ x, y: y - i });
        break;
      } else result.push({ x, y: y - i });
    }

    // can go right???
    for (let i: number = 1; i < 7; i++) {
      if (x + i > 7 || squares[x + 1][y].isFriend(this.player)) break;
      else if (squares[x + i][y].isEnemy(this.player)) {
        result.push({ x: x + i, y });
        break;
      } else result.push({ x: x + i, y });
    }

    // can go left???
    for (let i: number = 1; i < 7; i++) {
      if (x - i < 0 || squares[x - 1][y].isFriend(this.player)) break;
      else if (squares[x - i][y].isEnemy(this.player)) {
        result.push({ x: x - i, y });
        break;
      } else result.push({ x: x - i, y });
    }

    // can go north-east???
    for (let i: number = 1; i < 7; i++) {
      if (y + i > 7 || x + i > 7 || squares[x + i][y + i].isFriend(this.player))
        break;
      else if (squares[x + i][y + i].isEnemy(this.player)) {
        result.push({ x: x + i, y: y + i });
        break;
      } else result.push({ x: x + i, y: y + i });
    }

    // can go north-west???
    for (let i: number = 1; i < 7; i++) {
      if (y + i > 7 || x - i < 0 || squares[x - i][y + i].isFriend(this.player))
        break;
      else if (squares[x - i][y + i].isEnemy(this.player)) {
        result.push({ x: x - i, y: y + i });
        break;
      } else result.push({ x: x - i, y: y + i });
    }

    // can go south-east???
    for (let i: number = 1; i < 7; i++) {
      if (y - i < 0 || x + i > 7 || squares[x + 1][y - i].isFriend(this.player))
        break;
      else if (squares[x + i][y - i].isEnemy(this.player)) {
        result.push({ x: x + i, y: y - i });
        break;
      } else result.push({ x: x + i, y: y - i });
    }

    // can go south-west???
    for (let i: number = 1; i < 7; i++) {
      if (x - i < 0 || y - i < 0 || squares[x - 1][y - 1].isFriend(this.player))
        break;
      else if (squares[x - i][y - 1].isEnemy(this.player)) {
        result.push({ x: x - i, y: y - 1 });
        break;
      } else result.push({ x: x - i, y: y - 1 });
    }

    return result;
  }
}
