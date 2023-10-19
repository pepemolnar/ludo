import { Prisma } from '@prisma/client';
import { FigureModel } from '../../models/FigureModel';
import { ICreateFigure } from '../../../tpyes/figureTypes';

export class FigureBusiness extends FigureModel {
  public async getFiguresByPlayerId(playerId: number) {
    return await this.readMany({
      playerId
    });
  }

  public async createFiguresOfPlayer(playerId: number, figureConfigs: ICreateFigure[]) {
    for (const figureConfig of figureConfigs) {
      await this.createFigure(playerId, figureConfig);
    }
  }

  public async createFigure(playerId: number, figureConfig: ICreateFigure) {
    const data = {
      playerId,
      position: figureConfig.position,
      config: figureConfig.config as Prisma.InputJsonValue
    };

    const figureModel = new FigureModel();
    await figureModel.create(data);
  }

  public async moveFigure(id: number, position: number, config: unknown) {
    return await this.update({ id }, { position, config: config as Prisma.InputJsonValue });
  }
}
