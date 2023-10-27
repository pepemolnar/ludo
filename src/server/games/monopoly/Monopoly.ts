import { GameBusiness } from '../../business/game/GameBusiness';
import { PlayerBusiness } from '../../business/player/PlayerBusiness';
import { TFieldCount, TStepOutField } from '../../../tpyes/ludoTypes';
import { ILudoGameConfig } from '../../types/ludoTypes';
import { Game } from '../Game';
import { Player } from '../Player';
import { IGame, IStatusResponseData } from '../../types/gameTypes';
import { IPlayerStatus } from '../../../tpyes/playerTypes';
import { MonopolyPlayer } from './MonopolyPlayer';
import { IMoveConfig, IMoveResponseData } from '../../../tpyes/gameTypes';

export class Monopoly extends Game implements IGame {
  id!: number;
  players: Player[];
  numberOfFields!: TFieldCount;
  stepOutFields!: TStepOutField;

  constructor(gameBusiness: GameBusiness) {
    super(gameBusiness);
    this.players = [];
  }

  public async build(gameId: number, config: object): Promise<void> {
    const ludoConfig = config as ILudoGameConfig;
    this.numberOfFields = ludoConfig.numberOfFields;
    this.stepOutFields = ludoConfig.stepOutFields;
    this.id = gameId;

    await this.buildPlayers(gameId);
  }

  public getStatus(): IStatusResponseData {
    const playerStatuses = this.getPlayerStatuses();
    const responseData = {
      numberOfFields: this.numberOfFields,
      stepOutFields: this.stepOutFields,
      players: playerStatuses
    };

    return responseData;
  }

  public async move(config: IMoveConfig): Promise<IMoveResponseData> {
    const activePlayer = this.getActivePlayer();
    const rolledNumber = await this.getRolledNumber();
    const responseData: IMoveResponseData = {
      activePlayerId: activePlayer.id,
      newPosition: 0,
      nextPlayerId: 0,
      playerWon: false
    };

    responseData.playerWon = this.didPlayerWin();
    responseData.nextPlayerId = await this.activateNextPlayer();

    return responseData;
  }

  private async getRolledNumber(): Promise<number> {
    return await this.gameBusiness.getLastRolledNumber(this.id);
  }

  private getPlayerStatuses() {
    const playerStatuses: IPlayerStatus[] = [];
    for (const player of this.players) {
      const playerStatus = player.getStatus();
      playerStatuses.push(playerStatus);
    }
    return playerStatuses;
  }

  private async buildPlayers(gameId: number) {
    const players = await this.gameBusiness.getPlayersOfGame(gameId);

    for (const player of players) {
      const newPlayer = new MonopolyPlayer(new PlayerBusiness());
      await newPlayer.build(player);
      this.players.push(newPlayer);
    }
  }

  protected didPlayerWin(): boolean {
    const activePlayer = this.getActivePlayer();

    return true;
  }
}
