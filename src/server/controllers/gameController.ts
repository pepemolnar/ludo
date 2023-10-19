import { v4 as uuidv4 } from 'uuid';
import { Ludo } from '../business/game/Ludo';
import { PLAYERS } from '../constants/playerConstants';
import { GameBusiness } from '../business/game/GameBusiness';
import { ILudoStatusResponse, IRollDiceResponse, IStepResponse } from '../../tpyes/ludoTypes';

export const createGame = async (): Promise<string> => {
  const hash = uuidv4();
  const gameBusiness = new GameBusiness();

  await gameBusiness.createGame({
    hash,
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
  });

  return hash;
};

export const getGameStatus = async (hash: string): Promise<ILudoStatusResponse> => {
  const ludo = new Ludo(new GameBusiness());
  await ludo.build(hash);
  const data = ludo.getStatus();

  return {
    success: true,
    message: '',
    data
  };
};

export const stepWithFigure = async (hash: string, figureId: number): Promise<IStepResponse> => {
  const ludo = new Ludo(new GameBusiness());
  await ludo.build(hash);
  const data = await ludo.selectFigureToMove(figureId);

  return {
    success: true,
    message: 'Success',
    data
  };
};

export const rollTheDice = async (hash: string): Promise<IRollDiceResponse> => {
  const ludo = new Ludo(new GameBusiness());
  await ludo.build(hash);
  const data = await ludo.rollTheDice();

  return {
    success: true,
    message: 'Success',
    data
  };
};
