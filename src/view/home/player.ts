import { Figure } from './figure';

enum PlayerStatus {
  INGAME,
  DONE
}

export type PlayerColor =
  | 'RED'
  | 'BLUE'
  | 'GREEN'
  | 'YELLOW'
  | 'ORANGE'
  | 'PURPLE';

export class Player {
  status: PlayerStatus;
  active: boolean;
  color: PlayerColor;
  figures!: Figure[];

  playerHouseDOM: HTMLElement | null;

  constructor(color: PlayerColor) {
    this.color = color;
    this.active = false;
    this.status = PlayerStatus.INGAME;
    this.playerHouseDOM = document.getElementById(
      `${this.color.toLowerCase()}-house`
    );
    this.createFigures();
  }

  isActive(): boolean {
    return this.active;
  }

  setActivity(status: boolean): void {
    this.active = status;

    this.playerHouseDOM?.setAttribute('active', String(status));
  }

  createFigures(): void {
    for (let i = 0; i < 4; i++) {
      this.figures.push(new Figure(this.color, i));
    }
  }
}
