import { Player, PlayerColor } from './player';

export class Game {
  players!: Player[];
  rollButtonDOM = document.getElementById('roll_button');

  constructor(colors: PlayerColor[]) {
    this.createPlayers(colors);
    this.start();
  }

  createPlayers(colors: PlayerColor[]): void {
    const players = [];

    for (let i = 0; i < colors.length; i++) {
      const player = new Player(colors[i]);
      players.push(player);
    }

    this.players = players;
  }

  start(): void {
    this.activateNextPlayer();
    this.activateDice();
  }

  activateNextPlayer(): void {
    const activePlayerIndex = this.getActivePlayerIndex();

    this.players[activePlayerIndex].setActivity(false);

    if (activePlayerIndex === this.players.length - 1) {
      this.players[0].setActivity(true);
      return;
    }

    this.players[activePlayerIndex + 1].active = true;
  }

  getActivePlayerIndex(): number {
    this.players.findIndex((player) => {
      return player.active;
    });

    return this.players.length - 1;
  }

  activateDice(): void {
    this.rollButtonDOM?.setAttribute('active', 'true');
  }

  rollTheDice(): void {
    const rolledNumberDOM = document.getElementById('rolled_number');
    if (!rolledNumberDOM) {
      console.log('Cannot set rolled number!');
      return;
    }

    const rolledNumber = Math.round(Math.random() * 5 + 1);

    rolledNumberDOM.innerHTML = String(rolledNumber);

    this.activateNextPlayer();
  }
}
