import { ICreateLudo } from '../types/ludoTypes';
import { PLAYERS } from './playerConstants';

export const GAME_CONFIG: ICreateLudo = {
  hash: '52029830-b125-4f3f-8e54-d61e26fdf068',
  type: 'ludo',
  playerConfigs: PLAYERS,
  config: {
    numberOfFields: 16
  }
};
