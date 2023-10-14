import { TPlayerColor } from './playerTypes';

export interface IFigure {
  id: number;
  position: number;
  color: TPlayerColor;
  stepOutPosition: number;
}

export interface ISelectableFigure {
  id: number;
  playerColor: TPlayerColor;
}
