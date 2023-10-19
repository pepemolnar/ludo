import { Player as PrismaPlayer } from '@prisma/client';
import { LudoFigure } from '../figure/LudoFigure';
import { PlayerBusiness } from './PlayerBusiness';
import { FigureBusiness } from '../figure/FigureBusiness';
import { ILudoPlayerStatus, TSelectableColors } from '../../../tpyes/playerTypes';
import { ILudoFigureStatus } from '../../../tpyes/figureTypes';
import { CustomError } from '../../middlewares/CustomError';
import { Player } from './Player';
import { ILudoPlayer } from '../../types/ludoTypes';
import { IPosition } from '../../types/figureTypes';

export class LudoPlayer extends Player implements ILudoPlayer {
  figures: LudoFigure[];

  constructor(playerBusiness: PlayerBusiness) {
    super(playerBusiness);
    this.figures = [];
  }

  public async build(player: PrismaPlayer) {
    this.id = player.id;
    this.active = player.active;
    this.color = player.color as TSelectableColors;
    await this.buildFigures(this.id);
  }

  public async setActivity(active: boolean) {
    this.active = active;
    await this.playerBusiness.setPlayerActivity(this.id, active);
  }

  public getStatus(): ILudoPlayerStatus {
    const figureStatuses: ILudoFigureStatus[] = this.getFigureStatuses();
    const status = {
      id: this.id,
      active: this.active,
      color: this.color,
      figures: figureStatuses
    };

    return status;
  }

  private async buildFigures(playerId: number) {
    const figures = await this.playerBusiness.getFiguresOfPlayer(playerId);

    for (const figure of figures) {
      const newFigure = new LudoFigure(new FigureBusiness());
      await newFigure.build(figure);
      this.figures.push(newFigure);
    }
  }

  private getFigureStatuses(): ILudoFigureStatus[] {
    const figureStatuses: ILudoFigureStatus[] = [];
    for (const figure of this.figures) {
      const figureStatus = figure.getStatus();
      figureStatuses.push(figureStatus);
    }
    return figureStatuses;
  }

  public async stepWithFigure(numberOfFields: number, rolledNumber: number, figureId: number) {
    const figure = this.figures.find((figure) => figure.id === figureId);

    if (!figure) {
      throw new CustomError('Figure selected does not exists!', 404, true);
    }

    const idOfSelectableFiguresToMove = this.getIdOfSelectableFiguresToMove(rolledNumber, numberOfFields);
    const stepIsValid = this.active && idOfSelectableFiguresToMove.includes(figureId);

    if (!stepIsValid) {
      throw new CustomError('You can not move with this figure!', 404, true);
    }

    const newPosition = await figure.step(rolledNumber, numberOfFields);

    return newPosition;
  }

  public getIdOfSelectableFiguresToMove(rolledNumber: number, numberOfFields: number): number[] {
    const idOfSelectableFiguresToMove = [];

    for (const figure of this.figures) {
      const figureCanMove = figure.canFigureMoveToNewPosition(rolledNumber);
      const newPosition = figure.getNewPosition(rolledNumber, numberOfFields);
      const figuresNewPositionInGoalIsAlreadyTaken =
        newPosition.positionType === 'IN_GOAL' && this.isGoalPositionTaken(newPosition.position);

      if (figureCanMove && !figuresNewPositionInGoalIsAlreadyTaken) {
        idOfSelectableFiguresToMove.push(figure.id);
      }
    }

    return idOfSelectableFiguresToMove;
  }

  isGoalPositionTaken(position: number): boolean {
    for (const figure of this.figures) {
      if (figure.positionType === 'IN_GOAL' && figure.position === position) {
        return true;
      }
    }
    return false;
  }

  getFigurePositions(): IPosition[] {
    return this.figures.map((figure) => {
      return { position: figure.position, positionType: figure.positionType };
    });
  }
}
