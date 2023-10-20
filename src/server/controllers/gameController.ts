import { v4 as uuidv4 } from 'uuid';
import { ICreateGame, IStatusResponse } from '../types/gameTypes';
import { IMoveConfig, IMoveResponse, IRollDiceResponse } from '../../tpyes/gameTypes';
import { GameBusiness } from '../business/game/GameBusiness';
import { CustomError } from '../middlewares/CustomError';
import { Ludo } from '../games/ludo/Ludo';
import { Monopoly } from '../games/monopoly/Monopoly';
import { IResponse } from '../../tpyes/generalTypes';
import { Prisma } from '@prisma/client';

export class GameController {
  private readonly gameBusiness;
  response: IResponse;

  constructor() {
    this.response = {
      success: true,
      message: '',
      data: {}
    };
    this.gameBusiness = new GameBusiness();
  }

  public async createGame(config: ICreateGame) {
    const hash = uuidv4();

    await this.gameBusiness.createGame(hash, config);

    return hash;
  }

  public getGameStatus = async (hash: string): Promise<IStatusResponse> => {
    const game = await this.buildGame(hash);
    const data = game.getStatus();

    return {
      success: true,
      message: '',
      data
    };
  };

  public moveWithPlayer = async (hash: string, config: IMoveConfig): Promise<IMoveResponse> => {
    const game = await this.buildGame(hash);
    const data = await game.move(config);

    return {
      success: true,
      message: 'Success',
      data
    };
  };

  public rollTheDice = async (hash: string): Promise<IRollDiceResponse> => {
    const game = await this.buildGame(hash);
    const data = await game.rollDice();

    return {
      success: true,
      message: 'Success',
      data
    };
  };

  private async buildGame(hash: string) {
    const gameRecord = await this.gameBusiness.getGameByHash(hash);

    if (!gameRecord) {
      console.error(gameRecord);
      throw new CustomError('A választot játék nem létezik!', 404, true);
    }

    let game;

    switch (gameRecord.type) {
      case 'ludo':
        game = new Ludo(this.gameBusiness);
        break;
      case 'monopoly':
        game = new Monopoly(this.gameBusiness);
        break;
      default:
        throw new CustomError('Game creation failed!', 401, true);
    }

    if (!gameRecord.config) {
      throw new CustomError('Game could not be loaded!', 500, true);
    }

    await game.build(gameRecord.id, gameRecord.config as Prisma.JsonObject);
    return game;
  }
}
