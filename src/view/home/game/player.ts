import { FigureInterface } from '../../types/figureTypes';
import { Position, PositionType } from '../../types/gameTypes';
import { PlayerColor, PlayerInterface } from '../../types/playerTypes';
import { Figure } from './figure';

export class Player implements PlayerInterface {
  active: boolean;
  color: PlayerColor;
  figures: Figure[];
  startPosition: number;

  playerHouseDOM: HTMLElement | null;

  constructor(player: PlayerInterface) {
    this.color = player.color;
    this.active = false;
    this.figures = [];
    this.startPosition = player.startPosition;
    this.playerHouseDOM = document.getElementById(
      `${this.color.toLowerCase()}_house`
    );
    this.createFigures();
  }

  isActive(): boolean {
    return this.active;
  }

  activate(): void {
    this.setActivity(true);
  }

  deactivate(): void {
    this.removeSelectabilityFromFigures();
    this.setActivity(false);
  }

  private setActivity(active: boolean): void {
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

  getIndexOfSelectableFiguresToMove(
    rolledNumber: number,
    numberOfFields: number
  ): number[] {
    const indexOfSelectableFiguresToMove = [];

    for (const figure of this.figures) {
      const figureCanMove = figure.canFigureMoveToNewPosition(rolledNumber);
      const newPosition = figure.getNewPosition(rolledNumber, numberOfFields);
      const figuresNewPositionInGoalIsAlreadyTaken =
        newPosition.positionType === PositionType.IN_GOAL &&
        this.isGoalPositionTaken(newPosition.position);

      if (figureCanMove && !figuresNewPositionInGoalIsAlreadyTaken) {
        figure.setSelectability(true);
        indexOfSelectableFiguresToMove.push(figure.id);
      }
    }

    return indexOfSelectableFiguresToMove;
  }

  activateFiguresByIndex(indexOfSelectableFiguresToMove: number[]): void {
    for (const figureIndex of indexOfSelectableFiguresToMove) {
      this.figures[figureIndex].setSelectability(true);
    }
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

  isGoalPositionTaken(position: number): boolean {
    for (const figure of this.figures) {
      if (
        figure.positionType === PositionType.IN_GOAL &&
        figure.position === position
      ) {
        return true;
      }
    }
    return false;
  }

  getFigurePositions(): Position[] {
    return this.figures.map((figure) => {
      return { position: figure.position, positionType: figure.positionType };
    });
  }
}
