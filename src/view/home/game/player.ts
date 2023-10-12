import { FigureInterface } from '../../types/figureTypes';
import { PlayerColor, PlayerInterface } from '../../types/playerTypes';
import { Figure } from './figure';

enum PlayerStatus {
  INGAME,
  DONE
}

export class Player implements PlayerInterface {
  status: PlayerStatus;
  active: boolean;
  color: PlayerColor;
  rolledNumber: number;
  figures: Figure[];
  startPosition: number;

  playerHouseDOM: HTMLElement | null;

  constructor(player: PlayerInterface) {
    this.color = player.color;
    this.active = false;
    this.figures = [];
    this.rolledNumber = 0;
    this.status = PlayerStatus.INGAME;
    this.startPosition = player.startPosition;
    this.playerHouseDOM = document.getElementById(
      `${this.color.toLowerCase()}_house`
    );
    this.createFigures();
  }

  isActive(): boolean {
    return this.active;
  }

  setActivity(active: boolean): void {
    this.active = active;

    this.playerHouseDOM?.setAttribute('active', String(active));
  }

  createFigures(): void {
    for (let i = 0; i < 4; i++) {
      const figure: FigureInterface = {
        id: i,
        position: 0,
        color: this.color,
        stepOutPosition: this.startPosition
      };
      this.figures.push(new Figure(figure));
    }
  }

  setFiguresSelectability(): number {
    let selectableFigureCount = 0;
    for (const figure of this.figures) {
      if (this.active && figure.isFigureSelectable(this.rolledNumber)) {
        figure.setSelectability(true);
        selectableFigureCount += 1;
      }
    }
    return selectableFigureCount;
  }

  rollTheDice(): number {
    const rolledNumber = Math.round(Math.random() * 5 + 1);

    this.rolledNumber = rolledNumber;
    this.setRolledNumberDOM(rolledNumber);

    return this.setFiguresSelectability();
  }

  stepWithFigure(figureId: number): void {
    const figure = this.figures.find((figure) => figure.id === figureId);

    if (!figure) {
      console.log('Figure selected does not exists!');
      return;
    }

    figure.step(this.rolledNumber);
    this.removeSelectabilityFromFigures();
  }

  setRolledNumberDOM(rolledNumber: number): void {
    const rolledNumberDOM = document.getElementById('rolled_number');

    if (!rolledNumberDOM) {
      console.log('Cannot set rolled number!');
      return;
    }

    rolledNumberDOM.innerHTML = String(rolledNumber);
  }

  removeSelectabilityFromFigures(): void {
    for (const figure of this.figures) {
      figure.setSelectability(false);
    }
  }
}
