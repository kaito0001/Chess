import { Players, PieceInterface, Position } from "../utils/interfaces_enums";
import BoardSquare from "./BoardSquare";

export default abstract class Piece implements PieceInterface {
  protected ID: number;
  protected player: Players;
  protected name!: string;
  protected position: Position;
  protected kills: number;
  protected isAlive: boolean;

  constructor(player: Players, position: Position) {
    this.ID = Date.now();
    this.position = position;
    this.kills = 0;
    this.isAlive = true;
    this.player = player;
  }

  die(): void {
    this.isAlive = false;
  }

  getID(): number {
    return this.ID;
  }

  abstract setName(): void;

  getPlayer(): Players {
    return this.player;
  }

  getName(): string {
    return this.name;
  }

  getPosition(): Position {
    return this.position;
  }

  killedAPiece(): void {
    this.kills++;
  }

  getKills(): number {
    return this.kills;
  }

  setPostion(position: Position): void {
    this.position = position;
  }

  abstract canMove(squares: BoardSquare[][]): Position[];
}
