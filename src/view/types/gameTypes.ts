import { PlayerInterface } from './playerTypes';

export interface GameInterface {
  players: PlayerInterface[];
  numberOfFields: FieldCount;
}

export type FieldCount = 16 | 24 | 32;
