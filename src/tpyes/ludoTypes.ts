import { IResponse } from './generalTypes';
import { ILudoPlayerStatus, TSelectableColors } from './playerTypes';

export interface IRollDiceResponse extends IResponse {
  data: IRollDiceResponseData;
}

export interface IRollDiceResponseData {
  rolledNumber: number;
  isRoundOver: boolean;
  activePlayerId: number;
  selectableFigureIds: number[];
}

export interface IStepResponse extends IResponse {
  data: IStepResponseData;
}

export interface IStepResponseData {
  activePlayerId: number;
  figureIdToMove: number;
  newPosition: number;
  positionType: TPositionType;
  nextPlayerId: number;
  playerWon: boolean;
  opponentFigureIdsHitByPlayer: number[];
}

export interface ILudoStatusResponse extends IResponse {
  data: ILudoStatusResponseData;
}

export interface ILudoStatusResponseData {
  numberOfFields: number;
  stepOutFields: TStepOutField;
  players: ILudoPlayerStatus[];
}

export type TPositionType = 'IN_HOUSE' | 'IN_GAME' | 'IN_GOAL';

export type TStepOutField = {
  [color in TSelectableColors]: number;
};

export type TFieldCount = 16 | 24 | 32;
