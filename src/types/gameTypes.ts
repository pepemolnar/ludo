import { PlayerInterface } from './playerTypes';

export interface GameInterface {
  players: PlayerInterface[];
  numberOfFields: FieldCount;
}

export interface Position {
  position: number;
  positionType: PositionType;
}

export type FieldCount = 16 | 24 | 32;

export enum PositionType {
  IN_HOUSE,
  IN_GAME,
  IN_GOAL
}
