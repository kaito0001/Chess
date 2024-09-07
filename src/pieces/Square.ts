import { Teams } from "../utils/types_enums";
import Piece from "./Piece";

export default class Square {
  private _currentPiece: Piece | undefined;

  constructor(currentPiece?: Piece) {
    this._currentPiece = currentPiece;
  }

  public set currentPiece(currentPiece: Piece | undefined) {
    if (this._currentPiece !== currentPiece) {
      this._currentPiece = currentPiece;
    }
  }

  public get currentPiece(): Piece | undefined {
    return this._currentPiece;
  }

  public isEmpty(): boolean {
    return !this._currentPiece;
  }

  public isFriend(myTeam: Teams): boolean {
    if (!this._currentPiece) return false;
    return this._currentPiece?.team === myTeam;
  }

  public isEnemy(myTeam: Teams): boolean {
    if (!this._currentPiece) return false;
    return !this.isEmpty() && !this.isFriend(myTeam);
  }
}
