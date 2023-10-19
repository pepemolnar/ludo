import { ICreateFigure, ICreateLudoFigure } from '../../tpyes/figureTypes';
import { TSelectableColors } from '../../tpyes/playerTypes';

export interface IPlayer {
  id: number;
  active: boolean;
  color: TSelectableColors;
}

export interface ICreatePlayer {
  userId: number;
  active: boolean;
  color: TSelectableColors;
  figures?: ICreateFigure[];
}
