import { Player as PrismaPlayer } from '@prisma/client';
import { IPlayerStatus, TSelectableColors } from '../../tpyes/playerTypes';
import { PlayerBusiness } from '../business/player/PlayerBusiness';
import { IPlayer } from '../types/playerTypes';

export abstract class Player implements IPlayer {
  id!: number;
  active!: boolean;
  color!: TSelectableColors;
  playerBusiness: PlayerBusiness;

  constructor(playerBusiness: PlayerBusiness) {
    this.playerBusiness = playerBusiness;
  }

  public async build(player: PrismaPlayer) {
    this.id = player.id;
    this.active = player.active;
    this.color = player.color as TSelectableColors;
  }

  public async setActivity(active: boolean) {
    this.active = active;
    await this.playerBusiness.setPlayerActivity(this.id, active);
  }

  public abstract getStatus(): IPlayerStatus;
}
