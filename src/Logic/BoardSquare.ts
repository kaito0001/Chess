import { Players } from "../utils/interfaces_enums";
import Piece from "./Piece";

export default class BoardSquare {
  private whiteAttackers: Piece[];
  private blackAttackers: Piece[];
  private currentPiece: Piece;

  constructor(currentPiece: Piece) {
    this.whiteAttackers = [];
    this.blackAttackers = [];
    this.currentPiece = currentPiece;
  }

  setCurrentPiece(currentPiece: Piece): void {
    this.currentPiece = currentPiece;
  }

  getCurrentPiece(): Piece {
    return this.currentPiece;
  }

  addWhiteAttacker(attacker: Piece): void {
    this.whiteAttackers.push(attacker);
  }

  removeWhiteAttacker(id: number): void {
    this.whiteAttackers = this.whiteAttackers.filter(
      (piece: Piece) => piece.getID() !== id
    );
  }

  getWhiteAttackers(): Piece[] {
    return this.whiteAttackers;
  }

  addBlackAttacker(attacker: Piece): void {
    this.blackAttackers.push(attacker);
  }

  getBlackAttackers(): Piece[] {
    return this.blackAttackers;
  }

  removeBlackAttacker(id: number): void {
    this.blackAttackers = this.blackAttackers.filter(
      (piece: Piece) => piece.getID() !== id
    );
  }

  getEnemyAttackers(player: Players): Piece[] {
    return player === Players.white ? this.blackAttackers : this.whiteAttackers;
  }

  isEmpty(): boolean {
    return this.currentPiece.getPlayer() === Players.none;
  }

  isFriend(player: Players): boolean {
    return this.currentPiece.getPlayer() === player;
  }
}
