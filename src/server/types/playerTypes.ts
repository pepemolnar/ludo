import { ICreateFigure, ICreateLudoFigure } from '../../tpyes/figureTypes';
import { TSelectableColors } from '../../tpyes/playerTypes';
import { LudoFigure } from '../business/figure/LudoFigure';

export interface ICreatePlayer {
  userId: number;
  active: boolean;
  color: TSelectableColors;
  figures?: ICreateFigure[];
}

export interface ILudoPlayer {
  id: number;
  active: boolean;
  color: TSelectableColors;
  figures: LudoFigure[];
}

export interface ICreateLudoPlayer extends ICreatePlayer {
  figures: ICreateLudoFigure[];
}
