import { IFigureStatus } from '../../../../sharedTpyes/figureTypes';
import { TPositionType } from '../../../../sharedTpyes/ludoTypes';
import { TSelectableColors } from '../../../../sharedTpyes/playerTypes';
import { IFigure } from '../../../types/figureTypes';

export class Figure implements IFigure {
  id: number;
  position: number;
  positionType: TPositionType;
  figureDOM: HTMLElement;

  constructor(color: TSelectableColors, figure: IFigureStatus) {
    this.id = figure.id;
    this.position = figure.position;
    this.positionType = figure.positionType;
    this.figureDOM = document.getElementById(`${color}_figure_${this.id}`) as HTMLElement;
  }

  public setSelectability(isSelectable: boolean): void {
    this.figureDOM.setAttribute('selectable', String(isSelectable));
  }

  public move(position: number, positionType: TPositionType, color: TSelectableColors) {
    let parentDOM = document.getElementById(`${color}_house`);

    if (positionType === 'IN_GAME') {
      parentDOM = document.getElementById(`field_${position}`);
    } else if (positionType === 'IN_GOAL') {
      parentDOM = document.getElementById(`${color}_goal_${position}`);
    }

    parentDOM?.appendChild(this.figureDOM);
  }
}
