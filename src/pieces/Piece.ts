import { Position, Teams } from "../utils/types_enums";
import Square from "./Square";

export default abstract class Piece {
  protected _team: Teams;
  protected name!: string;
  protected _position: Position;
  protected kills: number;
  protected _isAlive: boolean;

  constructor(team: Teams, position: Position) {
    this._position = position;
    this.kills = 0;
    this._isAlive = true;
    this._team = team;
    this.setName();
  }
  abstract validMoves(board: Square[][]): Position[];
  abstract pressureOnKing(board: Square[][], team: Teams): Position[];

  setName(): void {
    this.name = `${
      this.team === Teams.white ? "white" : "black"
    }-${this.constructor.name.toLowerCase()}`;
  }

  public die(): void {
    this._isAlive = false;
  }

  get isAlive(): boolean {
    return this._isAlive;
  }

  get team(): Teams {
    return this._team;
  }

  getName(): string {
    return this.name;
  }

  set position(position: Position) {
    this._position = position;
  }

  get position(): Position {
    return this._position;
  }

  killedAPiece(): void {
    this.kills++;
  }

  getKills(): number {
    return this.kills;
  }
}
