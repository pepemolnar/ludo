import { ICreateFigure } from '../../app/sharedTpyes/figureTypes';
import { TSelectableColors } from '../../app/sharedTpyes/playerTypes';

export interface IPlayer {
  id: number;
  active: boolean;
  color: TSelectableColors;
}

export interface ICreatePlayer {
  userId: number;
  active: boolean;
  color: string;
  figures?: ICreateFigure[];
}
