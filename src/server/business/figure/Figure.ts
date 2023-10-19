import { Figure as PrismaFigure } from '@prisma/client';
import { IFigureStatus } from '../../../tpyes/figureTypes';
import { IFigure } from '../../types/figureTypes';
import { FigureBusiness } from './FigureBusiness';

export abstract class Figure implements IFigure {
  id!: number;
  position!: number;
  figureBusiness: FigureBusiness;

  constructor(figureBusiness: FigureBusiness) {
    this.figureBusiness = figureBusiness;
  }

  public abstract build(figure: PrismaFigure): Promise<void>;

  public abstract getStatus(): IFigureStatus;
}
