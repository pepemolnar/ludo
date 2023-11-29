import { PLAYERS } from './playerConstants';

export const GAME_CONFIGS = {
  ludo16: {
    type: 'ludo',
    playerConfigs: PLAYERS,
    config: {
      numberOfFields: 16,
      stepOutFields: {
        red: 1,
        blue: 5,
        green: 9,
        yellow: 13
      }
    }
  }
};
