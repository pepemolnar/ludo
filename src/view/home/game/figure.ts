import { FigureInterface } from '../../types/figureTypes';
import { Position, PositionType } from '../../types/gameTypes';
import { PlayerColor } from '../../types/playerTypes';

export class Figure implements FigureInterface {
  id: number;
  color: PlayerColor;
  position: number;
  positionType: PositionType;
  selectableForMove: boolean;
  stepOutPosition: number;

  figureDOM: HTMLElement | null;

  constructor(figure: FigureInterface) {
    this.id = figure.id;
    this.color = figure.color;
    this.position = 0;
    this.positionType = PositionType.IN_HOUSE;
    this.selectableForMove = false;
    this.stepOutPosition = figure.stepOutPosition;
    this.figureDOM = document.getElementById(
      `${figure.color}_figure_${figure.id}`
    );
  }

  moveFigureDOM(): void {
    let field = document.getElementById(`field_${this.position}`);

    if (this.positionType === PositionType.IN_GOAL) {
      field = document.getElementById(`${this.color}_goal_${this.position}`);
    } else if (this.positionType === PositionType.IN_HOUSE) {
      field = document.getElementById(`${this.color}_house`);
    }

    if (field && this.figureDOM) {
      field?.appendChild(this.figureDOM);
    }
  }

  setSelectability(selectable: boolean): void {
    this.selectableForMove = selectable;
    this.figureDOM?.setAttribute('selectable', String(selectable));
  }

  step(numberOfSteps: number, numberOfFields: number): Position {
    const newPosition: Position = this.getNewPosition(
      numberOfSteps,
      numberOfFields
    );

    this.position = newPosition.position;
    this.positionType = newPosition.positionType;

    this.moveFigureDOM();
    return newPosition;
  }

  getNewPosition(numberOfSteps: number, numberOfFields: number): Position {
    let newPosition = this.position;
    let positionType = this.positionType;

    if (positionType === PositionType.IN_HOUSE) {
      newPosition = this.stepOutPosition;
      positionType = PositionType.IN_GAME;
    } else {
      for (let i = 0; i < numberOfSteps; i++) {
        newPosition += 1;

        if (newPosition > numberOfFields) {
          newPosition = 1;
        }
        if (newPosition === this.stepOutPosition) {
          newPosition = 1;
          positionType = PositionType.IN_GOAL;
        }
      }
    }

    return { position: newPosition, positionType };
  }

  canFigureMoveToNewPosition(rolledNumber: number): boolean {
    if (this.positionType === PositionType.IN_HOUSE && rolledNumber !== 6) {
      return false;
    }
    if (this.isFigureStepsOverTheGoals(rolledNumber)) {
      return false;
    }

    return true;
  }

  isFigureStepsOverTheGoals(rolledNumber: number): boolean {
    if (this.positionType === PositionType.IN_GOAL) {
      return this.position + rolledNumber > 4;
    }
    if (
      this.positionType === PositionType.IN_GAME &&
      this.position < this.stepOutPosition
    ) {
      return this.position + rolledNumber > this.stepOutPosition + 3;
    }

    return false;
  }

  stepBackToHouse(): void {
    this.position = 0;
    this.positionType = PositionType.IN_HOUSE;

    this.moveFigureDOM();
  }
}
