import { IFigure } from '../../../types/figureTypes';
import { IPlayer } from '../../../types/playerTypes';
import { Player } from './Player';

export class Ludo {
  players!: Player[];
  activePlayerIndex!: number;

  constructor(players: IPlayer[]) {
    this.createPlayers(players);
    this.activatePlayer(0);
  }

  public activateNextPlayer(): void {
    let nextPlayerIndex = this.activePlayerIndex + 1;
    this.players[this.activePlayerIndex].setActivity(false);

    if (nextPlayerIndex >= this.players.length) {
      nextPlayerIndex = 0;
    }

    this.activatePlayer(nextPlayerIndex);
    this.activePlayerIndex = nextPlayerIndex;
  }

  public makeFiguresSelectable(figures: IFigure[]): void {
    console.log(figures);
  }

  private activatePlayer(playerIndex: number): void {
    this.players[playerIndex].setActivity(true);
    this.activePlayerIndex = playerIndex;
  }

  private createPlayers(players: IPlayer[]): void {
    this.players = [];

    for (const player of players) {
      const newPlayer = new Player(player);
      this.players.push(newPlayer);
    }
  }
}
