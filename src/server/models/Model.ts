import prisma from './../db';

export abstract class Model {
  prisma = prisma;
  abstract create(data: unknown): Promise<unknown>;
  abstract createMany(data: unknown[]): Promise<unknown>;
  abstract read(where: unknown): Promise<unknown>;
  abstract readMany(where: unknown): Promise<unknown>;
  abstract update(where: unknown, data: unknown): Promise<unknown>;
  abstract updateMany(where: unknown, data: unknown): Promise<unknown>;
}
