import { TPositionType } from '../../tpyes/ludoTypes';
import { TSelectableColors } from '../../tpyes/playerTypes';
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
