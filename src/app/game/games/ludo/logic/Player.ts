import { ILudoFigureStatus, ILudoPlayerStatus, TPositionType } from '../../../../../tpyes/ludoTypes';
import { TSelectableColors } from '../../../../../tpyes/playerTypes';
import { IPlayer } from '../../../types/playerTypes';
import { Figure } from './Figure';

export class Player implements IPlayer {
  id: number;
  color: TSelectableColors;
  active: boolean;
  playerDOM: HTMLElement;
  figures: Figure[];

  constructor(player: ILudoPlayerStatus) {
    this.id = player.id;
    this.color = player.color;
    this.active = player.active;
    this.playerDOM = document.getElementById(`${player.color}_house`) as HTMLElement;
    this.figures = [];

    this.setActivity(player.active);
    this.createFigures(player.figures);
  }

  public setActivity(isActive: boolean): void {
    this.active = isActive;
    this.playerDOM.setAttribute('active', String(isActive));

    if (!isActive) {
      this.setFiguresSelectability(false);
    }
  }

  public makeFiguresSelectable(selectableFigureIds: number[]): void {
    for (const figure of this.figures) {
      if (selectableFigureIds.includes(figure.id)) {
        figure.setSelectability(true);
      }
    }
  }

  private createFigures(figureStatuses: ILudoFigureStatus[]) {
    for (const figureStatuse of figureStatuses) {
      const newFigure = new Figure(this.color, figureStatuse);
      this.figures.push(newFigure);
    }
  }

  public moveFigure(figureId: number, position: number, positionType: TPositionType) {
    const figure = this.getFigure(figureId);

    figure?.move(position, positionType, this.color);
  }

  private getFigure(figureId: number) {
    const figure = this.figures.find((figure) => figure.id === figureId);

    if (!figure) {
      console.error('Figure not found!');
    }

    return figure;
  }

  private setFiguresSelectability(isSelectable: boolean) {
    for (const figure of this.figures) {
      figure.setSelectability(false);
    }
  }
}
