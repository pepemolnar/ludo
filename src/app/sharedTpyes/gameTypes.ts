import { IResponse } from './generalTypes';

export type TGameType = 'ludo' | 'monopoly';

export interface IRollDiceResponse extends IResponse {
  data: IRollDiceResponseData;
}

export interface IRollDiceResponseData {
  rolledNumber: number;
  activePlayerId: number;
}

export interface IMoveConfig {
  playerId: number;
  figureId?: number;
}

export interface IMoveResponse extends IResponse {
  data: IMoveResponseData;
}

export interface IMoveResponseData {
  activePlayerId: number;
  newPosition: number;
  nextPlayerId: number;
  playerWon: boolean;
}
