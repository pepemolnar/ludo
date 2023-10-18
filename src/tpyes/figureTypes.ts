import { TPositionType } from './ludoTypes';

export interface IFigureStatus {
  id: number;
  position: number;
  positionType: TPositionType;
}

export interface ILudoFigureStatus {
  id: number;
  position: number;
  positionType: TPositionType;
}

export interface ICreateFigure {
  position: number;
  config: unknown;
}

export interface ICreateLudoFigure extends ICreateFigure {
  config: ICreateLudoFigureConfig;
}

export interface ICreateLudoFigureConfig {
  stepOutPosition: number;
  positionType: TPositionType;
}
