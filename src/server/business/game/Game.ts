import { IGame, IStatusResponseData } from '../../types/gameTypes';
import { IPlayer } from '../../types/playerTypes';
import { Player } from '../../games/Player';
import { GameBusiness } from '../../games/GameBusiness';

export abstract class Game implements IGame {
  id!: number;
  players: Player[];
  gameBusiness: GameBusiness;

  constructor(gameBusiness: GameBusiness) {
    this.players = [];
    this.gameBusiness = gameBusiness;
  }

  public abstract build(hash: string): Promise<void>;

  public abstract getStatus(): IStatusResponseData;

  protected getActivePlayerIndex(): number {
    for (const [key, player] of Object.entries(this.players)) {
      if (player.active) {
        return Number(key);
      }
    }

    return 0;
  }

  protected getActivePlayer(): IPlayer {
    for (const player of this.players) {
      if (player.active) {
        return player;
      }
    }

    return this.players[0];
  }

  protected async activateNextPlayer(): Promise<number> {
    let activePlayerIndex = this.getActivePlayerIndex();
    const activePlayer = this.players[activePlayerIndex];
    await activePlayer.setActivity(false);

    activePlayerIndex += 1;

    if (activePlayerIndex >= this.players.length) {
      activePlayerIndex = 0;
    }

    await this.players[activePlayerIndex].setActivity(true);
    return this.players[activePlayerIndex].id;
  }
}
