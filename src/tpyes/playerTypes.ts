import { IFigureStatus, ILudoFigureStatus } from './figureTypes';

export type TSelectableColors = 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple';

export interface IPlayerStatus {
  id: number;
  active: boolean;
  color: TSelectableColors;
  figures: IFigureStatus[];
}

export interface ILudoPlayerStatus extends IPlayerStatus {
  figures: ILudoFigureStatus[];
}
