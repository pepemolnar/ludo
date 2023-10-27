import { TSelectableColors } from '../../tpyes/playerTypes';
import { MonopolyPlayer } from '../games/monopoly/MonopolyPlayer';
import { ICreateGame, IGame } from './gameTypes';
import { ICreatePlayer, IPlayer } from './playerTypes';

export interface IMonopoly extends IGame {
  players: MonopolyPlayer[];
  fields: IMonopolyField[];
}

export interface ICreateMonopoly extends ICreateGame {
  playerConfigs: ICreateMonopolyPlayer[];
  config: {
    fields: TMonopolyField[];
  };
}

export interface IMonopolyPlayer extends IPlayer {
  id: number;
  active: boolean;
  color: TSelectableColors;
}

export interface ICreateMonopolyPlayer extends ICreatePlayer {}

export interface IMonopolyGameConfig {
  fields: TMonopolyField[];
}

export interface IMonopolyField {
  position: number;
  fieldType: TMonopolyField;
}

export type TMonopolyField = 'land' | 'chest' | 'luck' | 'prison';
