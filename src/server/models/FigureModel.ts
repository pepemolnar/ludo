import { Prisma } from '@prisma/client';
import { Model } from './Model';

export class FigureModel extends Model {
  public async create(data: Prisma.FigureUncheckedCreateInput) {
    return await this.prisma.figure.create({ data });
  }

  public async createMany(data: Prisma.FigureUncheckedCreateInput[]) {
    return await this.prisma.figure.createMany({ data });
  }

  public async read(where: Prisma.FigureWhereInput) {
    return await this.prisma.figure.findFirst({ where });
  }

  public async readMany(where: Prisma.FigureWhereInput) {
    return await this.prisma.figure.findMany({ where });
  }

  public async update(where: Prisma.FigureWhereUniqueInput, data: Prisma.FigureUncheckedUpdateInput) {
    return await this.prisma.figure.update({ where, data });
  }

  public async updateMany(where: Prisma.FigureWhereInput, data: Prisma.FigureUncheckedUpdateInput) {
    return await this.prisma.figure.updateMany({ where, data });
  }
}
