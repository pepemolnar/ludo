import { FigureInterface } from '../../types/figureTypes';
import { PlayerColor } from '../../types/playerTypes';

export class Figure implements FigureInterface {
  id: number;
  color: PlayerColor;
  position: number;
  inGoal: boolean;
  selectableForMove: boolean;
  stepOutPosition: number;

  figureDOM: HTMLElement | null;

  constructor(figure: FigureInterface) {
    this.id = figure.id;
    this.color = figure.color;
    this.position = 0;
    this.inGoal = false;
    this.selectableForMove = false;
    this.stepOutPosition = figure.stepOutPosition;
    this.figureDOM = document.getElementById(
      `${figure.color}_figure_${figure.id}`
    );
  }

  moveFigureDOM(): void {
    let field = document.getElementById(`field_${this.position}`);

    if (this.inGoal) {
      field = document.getElementById(`${this.color}_goal_${this.position}`);
    }

    if (field && this.figureDOM) {
      field?.appendChild(this.figureDOM);
    }
  }

  setSelectability(selectable: boolean): void {
    this.selectableForMove = selectable;
    this.figureDOM?.setAttribute('selectable', String(selectable));
  }

  step(numberOfSteps: number, numberOfFields: number): void {
    if (this.position === 0) {
      this.position = this.stepOutPosition;
    } else {
      for (let i = 0; i < numberOfSteps; i++) {
        this.position += 1;

        if (this.position > numberOfFields) {
          this.position = 1;
        }
        if (this.position === this.stepOutPosition) {
          this.position = 1;
          this.inGoal = true;
        }
      }
    }

    this.moveFigureDOM();
  }

  isFigureSelectable(rolledNumber: number): boolean {
    if (this.position > 0 || rolledNumber === 6) {
      if (this.isFigureStepsOverTheGoals(rolledNumber)) {
        return false;
      }
      return true;
    }

    return false;
  }

  isFigureStepsOverTheGoals(rolledNumber: number): boolean {
    if (this.inGoal) {
      return this.position + rolledNumber > 4;
    }
    if (this.position < this.stepOutPosition) {
      return this.position + rolledNumber > this.stepOutPosition + 4;
    }

    return false;
  }
}
