import {
  FieldCount,
  GameInterface,
  Position,
  PositionType
} from '../../types/gameTypes';
import { PlayerInterface } from '../../types/playerTypes';
import { Player } from './player';

export class Game implements GameInterface {
  players!: Player[];
  rolledNumber!: number;
  numberOfFields: FieldCount;
  activePlayerIndex!: number;
  rollButtonDOM = document.getElementById('roll_button') as HTMLElement;
  rolledNumberDOM = document.getElementById('rolled_number') as HTMLElement;

  constructor(game: GameInterface) {
    this.numberOfFields = game.numberOfFields;

    this.createPlayers(game.players);
    this.start();
  }

  start(): void {
    this.players[this.activePlayerIndex].activate();
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

  setDiceActivity(active: boolean): void {
    this.rollButtonDOM.setAttribute('active', String(active));
  }

  setRolledNumber(rolledNumber: number): void {
    this.rolledNumber = rolledNumber;
    this.rolledNumberDOM.textContent = String(rolledNumber);
  }

  activateNextPlayer(): void {
    this.players[this.activePlayerIndex].deactivate();

    if (this.activePlayerIndex === this.players.length - 1) {
      this.activePlayerIndex = -1;
    }

    this.activePlayerIndex += 1;
    this.players[this.activePlayerIndex].activate();
    this.setDiceActivity(true);
  }

  getRollResult(): number {
    return Math.round(Math.random() * 5 + 1);
  }

  rollTheDice(): void {
    const rolledNumber = this.getRollResult();
    const activePlayer = this.players[this.activePlayerIndex];
    const indexOfSelectableFiguresToMove: number[] =
      activePlayer.getIndexOfSelectableFiguresToMove(
        rolledNumber,
        this.numberOfFields
      );

    this.setDiceActivity(false);
    this.setRolledNumber(rolledNumber);

    if (!indexOfSelectableFiguresToMove.length) {
      this.activateNextPlayer();
      return;
    }

    activePlayer.activateFiguresByIndex(indexOfSelectableFiguresToMove);
  }

  selectFigureToMove(figureId: number): void {
    const player = this.players[this.activePlayerIndex];
    const figure = player.figures.find((figure) => figure.id === figureId);

    if (!figure) {
      console.log('Figure selected does not exists!');
      return;
    }

    const newPosition = figure.step(this.rolledNumber, this.numberOfFields);

    if (newPosition.positionType === PositionType.IN_GAME) {
      this.hitOpponentFiguresFromPosition(newPosition);
    }

    player.removeSelectabilityFromFigures();
    this.checkIfPlayerWon();
    this.activateNextPlayer();
  }

  hitOpponentFiguresFromPosition(position: Position): void {
    const activePlayer = this.players[this.activePlayerIndex];

    for (const player of this.players) {
      if (player === activePlayer) {
        continue;
      }
      for (const figure of player.figures) {
        if (
          figure.positionType === PositionType.IN_GAME &&
          figure.position === position.position
        ) {
          figure.stepBackToHouse();
        }
      }
    }
  }

  checkIfPlayerWon(): void {
    const activePlayer = this.players[this.activePlayerIndex];

    for (const figure of activePlayer.figures) {
      if (figure.positionType !== PositionType.IN_GOAL) {
        return;
      }
    }

    this.gameOver();
  }

  gameOver(): void {
    window.location.href = `/game-over?winner=${
      this.players[this.activePlayerIndex].color
    }`;
  }
}
