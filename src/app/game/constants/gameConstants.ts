import { PLAYERS } from './playerConstants';

export const DUMMY_CREATE_LUDO_CONFIG = {
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
};
