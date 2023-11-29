import { UserModel } from '../../models/UserModel';

export class UserBusiness extends UserModel {
  public async getUserById(id: number) {
    return await this.read({
      id
    });
  }
}
