import { v4 as uuidv4 } from 'uuid';
import { IRollDiceResponse } from '../types/gameTypes';
import { ISelectableFigure } from '../types/figureTypes';

export const createGame = (): string => {
  const gameID = uuidv4();
  // const game = new Game(GAME_CONFIG);

  return gameID;
};

export const getGameStatus = (gameID: string): object => {
  return {};
};

export const stepWithFigure = (): void => {};

export const rollTheDice = (): IRollDiceResponse => {
  const rolledNumber = Math.round(Math.random() * 5 + 1);
  const isRoundOver = true;
  const selectableFigures: ISelectableFigure[] = [];

  return {
    success: true,
    message: 'Success',
    data: {
      rolledNumber,
      isRoundOver,
      selectableFigures
    }
  };
};
