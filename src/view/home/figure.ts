import { PlayerColor } from './player';

export class Figure {
  position: number;
  selectableForMove: boolean;

  figureDOM: HTMLElement | null;

  constructor(color: PlayerColor, id: number) {
    this.position = 0;
    this.selectableForMove = true;
    this.figureDOM = document.getElementById(`${color}-figure-${id}`);
  }
}
