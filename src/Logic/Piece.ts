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

  abstract setName(): void;
  abstract canMove(squares: BoardSquare[][]): Position[];
  die(): void {
    this.isAlive = false;
  }
  getID(): number {
    return this.ID;
  }
  getPlayer(): Players {
    return this.player;
  }
  getName(): string {
    return this.name;
  }
  setPostion(position: Position): void {
    this.position = position;
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
}
