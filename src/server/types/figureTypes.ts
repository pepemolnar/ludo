import { TPositionType } from '../../app/sharedTpyes/ludoTypes';
import { TSelectableColors } from '../../app/sharedTpyes/playerTypes';
import { FigureBusiness } from '../business/figure/FigureBusiness';

export interface IFigure {
  id: number;
  position: number;
  figureBusiness: FigureBusiness;
}

export interface ISelectableFigure {
  id: number;
  playerColor: TSelectableColors;
}

export interface IPosition {
  position: number;
  positionType: TPositionType;
}
