import { TPositionType } from '../../tpyes/ludoTypes';
import { TSelectableColors } from '../../tpyes/playerTypes';

export interface ILudoFigure {
  id: number;
  position: number;
  positionType: TPositionType;
  stepOutPosition: number;
}

export interface ILudoFigureDBConfig {
  positionType: TPositionType;
  stepOutPosition: number;
}

export interface ISelectableFigure {
  id: number;
  playerColor: TSelectableColors;
}
