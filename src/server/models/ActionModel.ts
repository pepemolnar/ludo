import { Prisma } from '@prisma/client';
import { Model } from './Model';

export class ActionModel extends Model {
  public async create(data: Prisma.ActionUncheckedCreateInput) {
    return await this.prisma.action.create({ data });
  }

  public async createMany(data: Prisma.ActionUncheckedCreateInput[]) {
    return await this.prisma.action.createMany({ data });
  }

  public async read(where: Prisma.ActionWhereInput) {
    return await this.prisma.action.findFirst({ where });
  }

  public async readMany(where: Prisma.ActionWhereInput) {
    return await this.prisma.action.findMany({ where });
  }

  public async readLast(where: Prisma.ActionWhereInput) {
    return await this.prisma.action.findFirst({ where, take: -1 });
  }

  public async update(where: Prisma.ActionWhereUniqueInput, data: Prisma.ActionUncheckedUpdateInput) {
    return await this.prisma.action.update({ where, data });
  }

  public async updateMany(where: Prisma.ActionWhereInput, data: Prisma.ActionUncheckedUpdateInput) {
    return await this.prisma.action.updateMany({ where, data });
  }
}
