import { Prisma } from '@prisma/client';
import { ICreatePlayer } from './playerTypes';
import { TGameType } from '../../tpyes/gameTypes';
import { Player } from '../games/Player';
import { GameBusiness } from '../business/game/GameBusiness';
import { IResponse } from '../../tpyes/generalTypes';
import { IPlayerStatus } from '../../tpyes/playerTypes';

export interface IGame {
  id: number;
  players: Player[];
  gameBusiness: GameBusiness;
}

export interface ICreateGame {
  type: TGameType;
  config: Prisma.InputJsonValue;
  playerConfigs: ICreatePlayer[];
}

export interface IStatusResponse extends IResponse {
  data: IStatusResponseData;
}

export interface IStatusResponseData {
  players: IPlayerStatus[];
}

export type TSelectableGames = 'ludo16';
