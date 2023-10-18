import { ActionModel } from '../../models/ActionModel';

export class ActionBusiness extends ActionModel {
  public async getLastRollActionOfGame(gameId: number) {
    return await this.readLast({ gameId, action: 'roll' });
  }
}
