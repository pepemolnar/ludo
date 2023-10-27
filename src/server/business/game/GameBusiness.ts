import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../../middlewares/CustomError';
import { GameModel } from '../../models/GameModel';
import { IRollInfo } from '../../types/actionTypes';
import { ICreateGame } from '../../types/gameTypes';
import { ActionBusiness } from '../action/ActionBusiness';
import { PlayerBusiness } from '../player/PlayerBusiness';

export class GameBusiness extends GameModel {
  public async getGameByHash(hash: string) {
    return await this.read({
      hash
    });
  }

  public async getPlayersOfGame(gameId: number) {
    const playerBusiness = new PlayerBusiness();
    return await playerBusiness.getPlayersByGameId(gameId);
  }

  public async createGame(config: ICreateGame) {
    const hash = uuidv4();

    const game = await this.create({
      hash,
      type: config.type,
      config: config.config
    });
    const playerBusiness = new PlayerBusiness();

    const players = await playerBusiness.createPlayers(game.id, config.playerConfigs);

    await playerBusiness.setPlayerActivity(players[0].id, true);

    return hash;
  }

  public async createRollDiceAction(gameId: number, rolledNumber: number) {
    const actionBusiness = new ActionBusiness();
    const data = {
      gameId,
      action: 'roll',
      info: {
        rolledNumber
      }
    };
    await actionBusiness.create(data);
  }

  public async getLastRolledNumber(gameId: number) {
    const actionBusiness = new ActionBusiness();
    const action = await actionBusiness.getLastRollActionOfGame(gameId);
    const info = action?.info as unknown as IRollInfo;

    if (!info) {
      throw new CustomError('Last rolled number not found!', 404, true);
    }

    return info.rolledNumber;
  }
}
