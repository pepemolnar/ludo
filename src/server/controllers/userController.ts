import { PrismaClient } from '@prisma/client';
import { CustomError } from '../middlewares/CustomError';
import { Request, Response } from 'express';

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const prisma = new PrismaClient();
  const id = Number(req.params.id);

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new CustomError('Ez az ID nem létezik!', 404, true);
  }

  res.status(200).json(user);
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient();
  const { name, age } = req.body;

  const user = await prisma.user.create({
    data: { name, age: Number(age) }
  });

  res.status(200).json(user);
};
