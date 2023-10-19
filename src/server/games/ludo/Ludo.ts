import { IGameDBConfig } from '../../types/gameTypes';
import { LudoPlayer } from './LudoPlayer';
import { CustomError } from '../../middlewares/CustomError';
import { GameBusiness } from '../GameBusiness';
import { PlayerBusiness } from '../../business/player/PlayerBusiness';
import {
  ILudoStatusResponseData,
  IRollDiceResponseData,
  IStepResponseData,
  TFieldCount,
  TStepOutField
} from '../../../tpyes/ludoTypes';
import { ILudoPlayerStatus } from '../../../tpyes/playerTypes';
import { ILudo } from '../../types/ludoTypes';
import { IPosition } from '../../types/figureTypes';

export class Ludo implements ILudo {
  id!: number;
  players: LudoPlayer[];
  numberOfFields!: TFieldCount;
  stepOutFields!: TStepOutField;
  gameBusiness: GameBusiness;

  constructor(gameBusiness: GameBusiness) {
    this.players = [];
    this.gameBusiness = gameBusiness;
  }

  public async build(hash: string): Promise<void> {
    const game = await this.gameBusiness.read({
      hash
    });

    if (!game) {
      console.error(game);
      throw new CustomError('A választot játék nem létezik!', 404, true);
    }

    const config = game.config as unknown as IGameDBConfig;
    this.numberOfFields = config.numberOfFields;
    this.stepOutFields = config.stepOutFields;
    this.id = game.id;

    await this.buildPlayers(game.id);
  }

  public async rollTheDice() {
    const rolledNumber = this.getRollResult();
    const activePlayer = this.getActivePlayer();
    const indexOfSelectableFiguresToMove: number[] = activePlayer.getIdOfSelectableFiguresToMove(
      rolledNumber,
      this.numberOfFields
    );
    const result: IRollDiceResponseData = {
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

  private getRollResult(): number {
    return Math.round(Math.random() * 5 + 1);
  }

  private getActivePlayerIndex(): number {
    for (const [key, player] of Object.entries(this.players)) {
      if (player.active) {
        return Number(key);
      }
    }

    return 0;
  }

  private getActivePlayer(): LudoPlayer {
    for (const player of this.players) {
      if (player.active) {
        return player;
      }
    }

    return this.players[0];
  }

  private async activateNextPlayer() {
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

  public async selectFigureToMove(figureId: number): Promise<IStepResponseData> {
    const activePlayer = this.getActivePlayer();
    const rolledNumber = await this.getRolledNumber();
    const responseData: IStepResponseData = {
      activePlayerId: activePlayer.id,
      figureIdToMove: figureId,
      newPosition: 0,
      positionType: 'IN_HOUSE',
      nextPlayerId: 0,
      playerWon: false,
      opponentFigureIdsHitByPlayer: []
    };

    const newPosition = await activePlayer.stepWithFigure(this.numberOfFields, rolledNumber, figureId);
    responseData.newPosition = newPosition.position;
    responseData.positionType = newPosition.positionType;

    if (newPosition.positionType === 'IN_GAME') {
      responseData.opponentFigureIdsHitByPlayer = await this.hitOpponentFiguresFromPosition(newPosition);
    }

    responseData.playerWon = this.didPlayerWin();
    responseData.nextPlayerId = await this.activateNextPlayer();

    return responseData;
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

  private didPlayerWin(): boolean {
    const activePlayer = this.getActivePlayer();

    for (const figure of activePlayer.figures) {
      if (figure.positionType !== 'IN_GOAL') {
        return false;
      }
    }

    return true;
  }
}
