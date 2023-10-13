import { GameInterface } from '../types/gameTypes';
import { PLAYERS_16, PLAYERS_20 } from './playerConstants';


export const GAME_CONFIG_16: GameInterface = {
  players: PLAYERS_16,
  numberOfFields: 16
};

export const GAME_CONFIG_20: GameInterface = {
  players: PLAYERS_20,
  numberOfFields: 20
};
