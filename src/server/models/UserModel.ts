import { Prisma } from '@prisma/client';
import { Model } from './Model';

export class UserModel extends Model {
  public async create(data: Prisma.UserUncheckedCreateInput) {
    return await this.prisma.user.create({ data });
  }

  public async createMany(data: Prisma.UserUncheckedCreateInput[]) {
    return await this.prisma.user.createMany({ data });
  }

  public async read(where: Prisma.UserWhereInput) {
    return await this.prisma.user.findFirst({ where });
  }

  public async readMany(where: Prisma.UserWhereInput) {
    return await this.prisma.user.findMany({ where, orderBy: { id: 'asc' } });
  }

  public async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUncheckedUpdateInput) {
    return await this.prisma.user.update({ where, data });
  }

  public async updateMany(where: Prisma.UserWhereInput, data: Prisma.UserUncheckedUpdateInput) {
    return await this.prisma.user.updateMany({ where, data });
  }
}
