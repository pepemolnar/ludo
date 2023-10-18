import { Prisma } from '@prisma/client';
import { Model } from './Model';

export class GameModel extends Model {
  public async create(data: Prisma.GameUncheckedCreateInput) {
    return await this.prisma.game.create({ data });
  }

  public async createMany(data: Prisma.GameUncheckedCreateInput[]) {
    return await this.prisma.game.createMany({ data });
  }

  public async read(where: Prisma.GameWhereInput) {
    return await this.prisma.game.findFirst({ where });
  }

  public async readMany(where: Prisma.GameWhereInput) {
    return await this.prisma.game.findMany({ where });
  }

  public async update(where: Prisma.GameWhereUniqueInput, data: Prisma.GameUncheckedUpdateInput) {
    return await this.prisma.game.update({ where, data });
  }

  public async updateMany(where: Prisma.GameWhereInput, data: Prisma.GameUncheckedUpdateInput) {
    return await this.prisma.game.updateMany({ where, data });
  }
}
