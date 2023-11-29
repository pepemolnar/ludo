import { TPositionType } from './ludoTypes';

export interface IFigureStatus {
  id: number;
  position: number;
  positionType: TPositionType;
}

export interface ICreateFigure {
  position: number;
  config: unknown;
}
