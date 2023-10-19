import { Prisma } from '@prisma/client';
import { ILudoPlayer, ICreateLudoPlayer, ICreatePlayer } from './playerTypes';
import { TPositionType, TFieldCount, TStepOutField } from '../../tpyes/ludoTypes';
import { TGameType } from '../../tpyes/gameTypes';

export interface ICreateGame {
  hash: string;
  type: TGameType;
  config: Prisma.InputJsonValue;
  playerConfigs: ICreatePlayer[];
}

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

export interface IPosition {
  position: number;
  positionType: TPositionType;
}

export interface IGameDBConfig {
  numberOfFields: TFieldCount;
  stepOutFields: TStepOutField;
}
