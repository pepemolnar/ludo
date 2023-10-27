import { LudoPlayer } from './LudoPlayer';
import { GameBusiness } from '../../business/game/GameBusiness';
import { PlayerBusiness } from '../../business/player/PlayerBusiness';
import {
  ILudoPlayerStatus,
  ILudoRollDiceResponseData,
  ILudoStatusResponseData,
  ILudoMoveResponseData,
  TFieldCount,
  TStepOutField
} from '../../../tpyes/ludoTypes';
import { ILudo, ILudoGameConfig } from '../../types/ludoTypes';
import { IPosition } from '../../types/figureTypes';
import { Game } from '../Game';
import { IMoveConfig } from '../../../tpyes/gameTypes';
import { CustomError } from '../../middlewares/CustomError';

export class Ludo extends Game implements ILudo {
  id!: number;
  players: LudoPlayer[];
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

  public async move(config: IMoveConfig): Promise<ILudoMoveResponseData> {
    if (!config.figureId) {
      throw new CustomError('Did not select a figure!', 402, true);
    }
    const activePlayer = this.getActivePlayer() as LudoPlayer;
    const rolledNumber = await this.getRolledNumber();
    const responseData: ILudoMoveResponseData = {
      activePlayerId: activePlayer.id,
      figureIdToMove: config.figureId,
      newPosition: 0,
      positionType: 'IN_HOUSE',
      nextPlayerId: 0,
      playerWon: false,
      opponentFigureIdsHitByPlayer: []
    };

    const newPosition = await activePlayer.stepWithFigure(this.numberOfFields, rolledNumber, config.figureId);
    responseData.newPosition = newPosition.position;
    responseData.positionType = newPosition.positionType;

    if (newPosition.positionType === 'IN_GAME') {
      responseData.opponentFigureIdsHitByPlayer = await this.hitOpponentFiguresFromPosition(newPosition);
    }

    responseData.playerWon = this.didPlayerWin();
    responseData.nextPlayerId = await this.activateNextPlayer();

    return responseData;
  }

  public async rollDice(): Promise<ILudoRollDiceResponseData> {
    const rolledNumber = this.getRollResult();
    const activePlayer = this.getActivePlayer() as LudoPlayer;
    const indexOfSelectableFiguresToMove: number[] = activePlayer.getIdOfSelectableFiguresToMove(
      rolledNumber,
      this.numberOfFields
    );
    const result: ILudoRollDiceResponseData = {
      rolledNumber,
      isRoundOver: false,
      activePlayerId: activePlayer.id,
      selectableFigureIds: indexOfSelectableFiguresToMove
    };

    await this.gameBusiness.createRollDiceAction(this.id, rolledNumber);

    if (!indexOfSelectableFiguresToMove.length) {
      const newActivePlayerId = await this.activateNextPlayer();
      result.activePlayerId = newActivePlayerId;
      result.isRoundOver = true;
    }

    return result;
  }

  public getStatus(): ILudoStatusResponseData {
    const playerStatuses = this.getPlayerStatuses();
    const responseData = {
      numberOfFields: this.numberOfFields,
      stepOutFields: this.stepOutFields,
      players: playerStatuses
    };

    return responseData;
  }

  private getPlayerStatuses() {
    const playerStatuses: ILudoPlayerStatus[] = [];
    for (const player of this.players) {
      const playerStatus = player.getStatus();
      playerStatuses.push(playerStatus);
    }
    return playerStatuses;
  }

  private async buildPlayers(gameId: number) {
    const players = await this.gameBusiness.getPlayersOfGame(gameId);

    for (const player of players) {
      const newPlayer = new LudoPlayer(new PlayerBusiness());
      await newPlayer.build(player);
      this.players.push(newPlayer);
    }
  }

  private async hitOpponentFiguresFromPosition(position: IPosition): Promise<number[]> {
    const activePlayer = this.getActivePlayer();
    const figureIdsHit: number[] = [];

    for (const player of this.players) {
      if (player === activePlayer) {
        continue;
      }
      for (const figure of player.figures) {
        if (figure.positionType === 'IN_GAME' && figure.position === position.position) {
          const figureSteppedBack = await figure.stepBackToHouse();
          figureIdsHit.push(figureSteppedBack.id);
        }
      }
    }

    return figureIdsHit;
  }

  private async getRolledNumber(): Promise<number> {
    return await this.gameBusiness.getLastRolledNumber(this.id);
  }

  protected didPlayerWin(): boolean {
    const activePlayer = this.getActivePlayer() as LudoPlayer;

    for (const figure of activePlayer.figures) {
      if (figure.positionType !== 'IN_GOAL') {
        return false;
      }
    }

    return true;
  }
}
