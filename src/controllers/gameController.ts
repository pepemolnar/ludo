import { v4 as uuidv4 } from 'uuid';
import { Game } from '../business/game/Game';
import { GAME_CONFIG } from '../constants/gameConstants';

export const createGame = (): string => {
  const gameID = uuidv4();
  const game = new Game(GAME_CONFIG);

  return gameID;
};

export const getGameStatus = (gameID: string): object => {
  return {};
};

export const stepWithFigure = (): void => {};
