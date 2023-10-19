import { ICreateLudoFigure } from '../../tpyes/figureTypes';
import { TFieldCount } from '../../tpyes/ludoTypes';
import { TSelectableColors } from '../../tpyes/playerTypes';
import { LudoFigure } from '../games/ludo/LudoFigure';
import { ICreateGame } from './gameTypes';
import { ICreatePlayer } from './playerTypes';

export interface ILudo {
  players: ILudoPlayer[];
  numberOfFields: TFieldCount;
}

export interface ICreateLudo extends ICreateGame {
  playerConfigs: ICreateLudoPlayer[];
  config: {
    numberOfFields: TFieldCount;
  };
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
