import { FieldCount, GameInterface } from '../../types/gameTypes';
import { PlayerInterface } from '../../types/playerTypes';
import { Player } from './player';

export class Game implements GameInterface {
  players!: Player[];
  numberOfFields: FieldCount;
  activePlayerIndex!: number;
  rollButtonDOM = document.getElementById('roll_button');

  constructor(game: GameInterface) {
    this.numberOfFields = game.numberOfFields;

    this.createPlayers(game.players);
    this.start();
  }

  start(): void {
    this.players[this.activePlayerIndex].setActivity(true);
    this.setDiceActivity(true);
  }

  createPlayers(players: PlayerInterface[]): void {
    const newPlayers = [];

    for (let i = 0; i < players.length; i++) {
      const newPlayer = new Player(players[i]);
      newPlayers.push(newPlayer);
    }

    this.players = newPlayers;
    this.activePlayerIndex = 0;
  }

  activateNextPlayer(): void {
    this.players[this.activePlayerIndex].setActivity(false);

    if (this.activePlayerIndex === this.players.length - 1) {
      this.activePlayerIndex = -1;
    }

    this.activePlayerIndex += 1;
    this.players[this.activePlayerIndex].setActivity(true);

    this.setDiceActivity(true);
  }

  setDiceActivity(active: boolean): void {
    this.rollButtonDOM?.setAttribute('active', String(active));
  }

  rollTheDice(): void {
    const selectableFigureCount =
      this.players[this.activePlayerIndex].rollTheDice();
    this.setDiceActivity(false);

    if (!selectableFigureCount) {
      this.activateNextPlayer();
    }
  }

  selectFigureToMove(figureId: number): void {
    this.players[this.activePlayerIndex].stepWithFigure(
      figureId,
      this.numberOfFields
    );

    this.activateNextPlayer();
  }
}
