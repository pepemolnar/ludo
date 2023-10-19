import { Prisma } from '@prisma/client';
import { ICreatePlayer } from './playerTypes';
import { TFieldCount, TStepOutField } from '../../tpyes/ludoTypes';
import { TGameType } from '../../tpyes/gameTypes';
import { Player } from '../business/player/Player';
import { GameBusiness } from '../business/game/GameBusiness';
import { IResponse } from '../../tpyes/generalTypes';
import { IPlayerStatus } from '../../tpyes/playerTypes';

export interface IGame {
  id: number;
  players: Player[];
  gameBusiness: GameBusiness;
}

export interface ICreateGame {
  hash: string;
  type: TGameType;
  config: Prisma.InputJsonValue;
  playerConfigs: ICreatePlayer[];
}

export interface IGameDBConfig {
  numberOfFields: TFieldCount;
  stepOutFields: TStepOutField;
}

export interface IStatusResponse extends IResponse {
  data: IStatusResponseData;
}

export interface IStatusResponseData {
  players: IPlayerStatus[];
}
