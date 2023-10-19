import { Figure } from '@prisma/client';
import { ILudoFigure, ILudoFigureDBConfig } from '../../types/figureTypes';
import { IPosition } from '../../types/gameTypes';
import { FigureBusiness } from './FigureBusiness';
import { TPositionType } from '../../../tpyes/ludoTypes';
import { ILudoFigureStatus } from '../../../tpyes/figureTypes';

export class LudoFigure implements ILudoFigure {
  id!: number;
  position!: number;
  positionType!: TPositionType;
  stepOutPosition!: number;
  figureBusiness: FigureBusiness;

  constructor(figureBusiness: FigureBusiness) {
    this.figureBusiness = figureBusiness;
  }

  public async build(figure: Figure) {
    const config = figure.config as unknown as ILudoFigureDBConfig;
    this.id = figure.id;
    this.position = figure.position;
    this.positionType = config.positionType;
    this.stepOutPosition = config.stepOutPosition;
  }

  public getStatus(): ILudoFigureStatus {
    return {
      id: this.id,
      position: this.position,
      positionType: this.positionType
    };
  }

  public getNewPosition(numberOfSteps: number, numberOfFields: number): IPosition {
    let newPosition = this.position;
    let positionType = this.positionType;

    if (positionType === 'IN_HOUSE' && numberOfSteps === 6) {
      newPosition = this.stepOutPosition;
      positionType = 'IN_GAME';
    } else {
      for (let i = 0; i < numberOfSteps; i++) {
        newPosition += 1;

        if (newPosition > numberOfFields) {
          newPosition = 1;
        }
        if (newPosition === this.stepOutPosition) {
          newPosition = 1;
          positionType = 'IN_GOAL';
        }
      }
    }

    return { position: newPosition, positionType };
  }

  public canFigureMoveToNewPosition(rolledNumber: number): boolean {
    if (this.positionType === 'IN_HOUSE' && rolledNumber !== 6) {
      return false;
    }
    if (this.isFigureStepsOverTheGoals(rolledNumber)) {
      return false;
    }

    return true;
  }

  public async step(numberOfSteps: number, numberOfFields: number): Promise<IPosition> {
    const newPosition: IPosition = this.getNewPosition(numberOfSteps, numberOfFields);

    this.position = newPosition.position;
    this.positionType = newPosition.positionType;

    await this.moveFigureToCurrentPositionInDB();

    return newPosition;
  }

  private isFigureStepsOverTheGoals(rolledNumber: number): boolean {
    if (this.positionType === 'IN_GOAL') {
      return this.position + rolledNumber > 4;
    }
    if (this.positionType === 'IN_GAME' && this.position < this.stepOutPosition) {
      return this.position + rolledNumber > this.stepOutPosition + 3;
    }

    return false;
  }

  public async stepBackToHouse(): Promise<Figure> {
    this.position = 0;
    this.positionType = 'IN_HOUSE';

    return await this.moveFigureToCurrentPositionInDB();
  }

  private async moveFigureToCurrentPositionInDB() {
    return await this.figureBusiness.moveFigure(this.id, this.position, {
      positionType: this.positionType,
      stepOutPosition: this.stepOutPosition
    });
  }
}