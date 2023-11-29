import { IGame, IStatusResponseData } from '../types/gameTypes';
import { Player } from './Player';
import { GameBusiness } from '../business/game/GameBusiness';
import { IMoveConfig, IMoveResponseData, IRollDiceResponseData } from '../../app/sharedTpyes/gameTypes';

export abstract class Game implements IGame {
  id!: number;
  players: Player[];
  gameBusiness: GameBusiness;

  constructor(gameBusiness: GameBusiness) {
    this.players = [];
    this.gameBusiness = gameBusiness;
  }

  public abstract build(gameId: number, config: object): Promise<void>;

  public abstract move(config: IMoveConfig): Promise<IMoveResponseData>;

  public async rollDice(): Promise<IRollDiceResponseData> {
    const rolledNumber = this.getRollResult(6);
    const activePlayer = this.getActivePlayer();
    const result: IRollDiceResponseData = {
      rolledNumber,
      activePlayerId: activePlayer.id
    };

    await this.gameBusiness.createRollDiceAction(this.id, rolledNumber);

    return result;
  }

  public abstract getStatus(): IStatusResponseData;

  protected abstract didPlayerWin(): boolean;

  protected getActivePlayerIndex(): number {
    for (const [key, player] of Object.entries(this.players)) {
      if (player.active) {
        return Number(key);
      }
    }

    return 0;
  }

  protected getActivePlayer(): Player {
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

  protected getRollResult(maxNumberOnDice?: number): number {
    const maxNumber = maxNumberOnDice ?? 6;
    return Math.round(Math.random() * (maxNumber - 1) + 1);
  }
}
