export default class Pawn {
  player: number;
  name: string;
  isAlive: boolean;

  constructor(player: number, name: string, isAlive: boolean) {
    this.player = player;
    this.name = name;
    this.isAlive = isAlive;
  }

  canMove() {}
}
