import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../../middlewares/CustomError';
import { GameModel } from '../../models/GameModel';
import { IRollInfo } from '../../types/actionTypes';
import { TSelectableGames } from '../../types/gameTypes';
import { ActionBusiness } from '../action/ActionBusiness';
import { PlayerBusiness } from '../player/PlayerBusiness';
import { GAME_CONFIGS } from '../../constants/gameConstants';
import { IPlayer } from '../../types/playerTypes';

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

  public async createGame(selectedGame: TSelectableGames) {
    const hash = uuidv4();

    const data = GAME_CONFIGS[selectedGame];

    const game = await this.create({
      hash,
      type: data.type,
      config: data.config
    });
    const playerBusiness = new PlayerBusiness();

    const players = await playerBusiness.createPlayers(game.id, data.playerConfigs);
    const firstPlayer = players[0] as IPlayer;

    await playerBusiness.setPlayerActivity(firstPlayer.id, true);

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
