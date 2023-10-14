import { ISelectableFigure } from './figureTypes';
import { IPlayer } from './playerTypes';

export interface IGame {
  players: IPlayer[];
  numberOfFields: TFieldCount;
}

export interface IPosition {
  position: number;
  positionType: PositionType;
}

export type TFieldCount = 16 | 24 | 32;

export enum PositionType {
  IN_HOUSE,
  IN_GAME,
  IN_GOAL
}

export interface IRollDiceResponse {
  success: boolean;
  message: string;
  data: IRollDiceResponseData;
}

interface IRollDiceResponseData {
  rolledNumber: number;
  isRoundOver: boolean;
  selectableFigures: ISelectableFigure[];
}
