import { IStatusResponse, IStatusResponseData } from '../../server/types/gameTypes';
import { ICreateFigure } from './figureTypes';
import { IMoveResponse, IMoveResponseData, IRollDiceResponse, IRollDiceResponseData } from './gameTypes';
import { IPlayerStatus, TSelectableColors } from './playerTypes';

export interface ILudoRollDiceResponse extends IRollDiceResponse {
  data: ILudoRollDiceResponseData;
}

export interface ILudoRollDiceResponseData extends IRollDiceResponseData {
  isRoundOver: boolean;
  selectableFigureIds: number[];
}

export interface ILudoMoveResponse extends IMoveResponse {
  data: ILudoMoveResponseData;
}

export interface ILudoMoveResponseData extends IMoveResponseData {
  activePlayerId: number;
  figureIdToMove: number;
  newPosition: number;
  positionType: TPositionType;
  nextPlayerId: number;
  playerWon: boolean;
  opponentFigureIdsHitByPlayer: number[];
}

export interface ILudoStatusResponse extends IStatusResponse {
  data: ILudoStatusResponseData;
}

export interface ILudoStatusResponseData extends IStatusResponseData {
  numberOfFields: number;
  stepOutFields: TStepOutField;
  players: ILudoPlayerStatus[];
}

export type TPositionType = 'IN_HOUSE' | 'IN_GAME' | 'IN_GOAL';

export type TStepOutField = {
  [color in TSelectableColors]: number;
};

export type TFieldCount = 16 | 24 | 32;

export interface ILudoFigureStatus {
  id: number;
  position: number;
  positionType: TPositionType;
}

export interface ICreateLudoFigure extends ICreateFigure {
  config: ICreateLudoFigureConfig;
}

export interface ICreateLudoFigureConfig {
  stepOutPosition: number;
  positionType: TPositionType;
}

export interface ILudoPlayerStatus extends IPlayerStatus {
  figures: ILudoFigureStatus[];
}
