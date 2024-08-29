import BoardSquare from "./BoardSquare";
import Piece from "./Piece";
import { PieceInterface, Players, Position } from "../utils/interfaces_enums";

export default class King extends Piece {
  constructor(player: Players, position: Position) {
    super(player, position);
    this.setName();
  }

  override setName(): void {
    this.name = `${this.player === Players.white ? "white" : "black"}-king`;
  }

  override canMove(squares: BoardSquare[][]): Position[] {
    let result: Position[] = [];
    const { x, y } = this.position;

    // can go right???
    if (
      x < 7 &&
      !squares[x + 1][y].isFriend(this.player) &&
      squares[x + 1][y].getEnemyAttackers(this.player).length === 0
    )
      result.push({ x: x + 1, y });

    // can go left???
    if (
      x > 0 &&
      !squares[x - 1][y].isFriend(this.player) &&
      squares[x - 1][y].getEnemyAttackers(this.player).length === 0
    )
      result.push({ x: x - 1, y });

    // can go up???
    if (
      y < 7 &&
      !squares[x][y + 1].isFriend(this.player) &&
      squares[x][y + 1].getEnemyAttackers(this.player).length === 0
    )
      result.push({ x, y: y + 1 });

    // can go down???
    if (
      y > 0 &&
      !squares[x][y - 1].isFriend(this.player) &&
      squares[x][y - 1].getEnemyAttackers(this.player).length === 0
    )
      result.push({ x, y: y - 1 });

    // can go north-east???
    if (
      x < 7 &&
      y < 7 &&
      !squares[x + 1][y + 1].isFriend(this.player) &&
      squares[x + 1][y + 1].getEnemyAttackers(this.player).length === 0
    )
      result.push({ x: x + 1, y: y + 1 });

    // can go north-west???
    if (
      x > 0 &&
      y < 7 &&
      !squares[x - 1][y + 1].isFriend(this.player) &&
      squares[x - 1][y + 1].getEnemyAttackers(this.player).length === 0
    )
      result.push({ x: x - 1, y: y + 1 });

    // can go south-east???
    if (
      x < 7 &&
      y > 0 &&
      !squares[x + 1][y - 1].isFriend(this.player) &&
      squares[x + 1][y - 1].getEnemyAttackers(this.player).length === 0
    )
      result.push({ x: x + 1, y: y - 1 });

    // can go south-west???
    if (
      x > 0 &&
      y > 0 &&
      !squares[x - 1][y - 1].isFriend(this.player) &&
      squares[x - 1][y - 1].getEnemyAttackers(this.player).length === 0
    )
      result.push({ x: x - 1, y: y - 1 });

    return result;
  }

  isChecked(squares: BoardSquare[][]): boolean {
    const { x, y } = this.position;

    return squares[x][y].getEnemyAttackers(this.player).length === 0;
  }
}
