import { ICreateLudoFigure, TFieldCount, TPositionType, TStepOutField } from '../../tpyes/ludoTypes';
import { TSelectableColors } from '../../tpyes/playerTypes';
import { LudoFigure } from '../games/ludo/LudoFigure';
import { LudoPlayer } from '../games/ludo/LudoPlayer';
import { IFigure } from './figureTypes';
import { ICreateGame, IGame } from './gameTypes';
import { ICreatePlayer, IPlayer } from './playerTypes';

export interface ILudo extends IGame {
  players: LudoPlayer[];
  numberOfFields: TFieldCount;
}

export interface ICreateLudo extends ICreateGame {
  playerConfigs: ICreateLudoPlayer[];
  config: {
    numberOfFields: TFieldCount;
  };
}

export interface ILudoPlayer extends IPlayer {
  id: number;
  active: boolean;
  color: TSelectableColors;
  figures: LudoFigure[];
}

export interface ICreateLudoPlayer extends ICreatePlayer {
  figures: ICreateLudoFigure[];
}

export interface ILudoGameConfig {
  numberOfFields: TFieldCount;
  stepOutFields: TStepOutField;
}

export interface ILudoFigure extends IFigure {
  id: number;
  position: number;
  positionType: TPositionType;
  stepOutPosition: number;
}

export interface ILudoFigureDBConfig {
  positionType: TPositionType;
  stepOutPosition: number;
}
