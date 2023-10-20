import { Player as PrismaPlayer } from '@prisma/client';
import { IPlayerStatus, TSelectableColors } from '../../../tpyes/playerTypes';
import { Player } from '../Player';
import { IPlayer } from '../../types/playerTypes';

export class MonopolyPlayer extends Player implements IPlayer {
  public async build(player: PrismaPlayer) {
    this.id = player.id;
    this.active = player.active;
    this.color = player.color as TSelectableColors;
  }

  public async setActivity(active: boolean) {
    this.active = active;
    await this.playerBusiness.setPlayerActivity(this.id, active);
  }

  public getStatus(): IPlayerStatus {
    const status = {
      id: this.id,
      active: this.active,
      color: this.color
    };

    return status;
  }

  public async step(numberOfFields: number, rolledNumber: number, figureId: number) {}
}
