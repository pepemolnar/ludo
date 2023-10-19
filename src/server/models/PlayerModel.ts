import { Prisma } from '@prisma/client';
import { Model } from './Model';

export class PlayerModel extends Model {
  public async create(data: Prisma.PlayerUncheckedCreateInput) {
    return await this.prisma.player.create({ data });
  }

  public async createMany(data: Prisma.PlayerUncheckedCreateInput[]) {
    return await this.prisma.player.createMany({ data });
  }

  public async read(where: Prisma.PlayerWhereInput) {
    return await this.prisma.player.findFirst({ where });
  }

  public async readMany(where: Prisma.PlayerWhereInput) {
    return await this.prisma.player.findMany({ where, orderBy: { id: 'asc' } });
  }

  public async update(where: Prisma.PlayerWhereUniqueInput, data: Prisma.PlayerUncheckedUpdateInput) {
    return await this.prisma.player.update({ where, data });
  }

  public async updateMany(where: Prisma.PlayerWhereInput, data: Prisma.PlayerUncheckedUpdateInput) {
    return await this.prisma.player.updateMany({ where, data });
  }
}
