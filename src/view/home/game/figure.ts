import { FigureInterface } from '../../types/figureTypes';
import { PlayerColor } from '../../types/playerTypes';

export class Figure implements FigureInterface {
  id: number;
  color: PlayerColor;
  position: number;
  selectableForMove: boolean;
  stepOutPosition: number;

  figureDOM: HTMLElement | null;

  constructor(figure: FigureInterface) {
    this.id = figure.id;
    this.color = figure.color;
    this.position = 0;
    this.selectableForMove = false;
    this.stepOutPosition = figure.stepOutPosition;
    this.figureDOM = document.getElementById(
      `${figure.color}_figure_${figure.id}`
    );
  }

  moveFigureDOM(): void {
    const field = document.getElementById(`field_${this.position}`);

    if (field && this.figureDOM) {
      field?.appendChild(this.figureDOM);
    }
  }

  setSelectability(selectable: boolean): void {
    this.selectableForMove = selectable;
    this.figureDOM?.setAttribute('selectable', String(selectable));
  }

  step(numberOfSteps: number): void {
    if (this.position === 0) {
      this.position = this.stepOutPosition;
    } else {
      this.position += numberOfSteps;
    }

    this.moveFigureDOM();
  }

  isFigureSelectable(rolledNumber: number): boolean {
    if (this.position > 0 || rolledNumber === 6) {
      return true;
    }
    return false;
  }
}
