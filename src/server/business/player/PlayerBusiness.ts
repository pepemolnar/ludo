import { PlayerModel } from '../../models/PlayerModel';
import { ICreatePlayer } from '../../types/playerTypes';
import { FigureBusiness } from '../figure/FigureBusiness';

export class PlayerBusiness extends PlayerModel {
  public async getPlayersByGameId(gameId: number) {
    return await this.readMany({
      gameId
    });
  }

  public async getFiguresOfPlayer(playerId: number) {
    const figureBusiness = new FigureBusiness();
    return await figureBusiness.getFiguresByPlayerId(playerId);
  }

  public async createPlayers(gameId: number, playerConfigs: ICreatePlayer[]) {
    const players = [];

    for (const config of playerConfigs) {
      const player = await this.createPlayer(gameId, config);
      players.push(player);
    }

    return players;
  }

  public async createPlayer(gameId: number, playerConfig: ICreatePlayer) {
    const data = {
      gameId,
      active: playerConfig.active,
      userId: playerConfig.userId,
      color: playerConfig.color
    };

    const player = await this.create(data);

    if (playerConfig.figures) {
      const figureBusiness = new FigureBusiness();
      await figureBusiness.createFiguresOfPlayer(player.id, playerConfig.figures);
    }

    return player;
  }

  public async setPlayerActivity(id: number, active: boolean) {
    await this.update({ id }, { active });
  }
}
