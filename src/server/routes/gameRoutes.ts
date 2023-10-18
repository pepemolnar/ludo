import type { Request, Response } from 'express';
import express from 'express';
import { createGame, getGameStatus, rollTheDice, stepWithFigure } from '../controllers/gameController';
import * as fs from 'fs';

export const gameRoutes = express.Router();

gameRoutes.get('/', (_req: Request, res: Response) => {
  const content = fs.readFileSync('src/app/game/game.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});

gameRoutes.get('/new', async (_req: Request, res: Response) => {
  const gameId = await createGame();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ gameId });
});

gameRoutes.get('/:hash/roll', async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const response = await rollTheDice(hash);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(response);
});

gameRoutes.post('/:hash/step', async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const { figureId } = req.body;
  const respone = await stepWithFigure(hash, figureId);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(respone);
});

gameRoutes.get('/:hash/status', async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const status = await getGameStatus(hash);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(status);
});

gameRoutes.get('/:hash', async (req: Request, res: Response) => {
  const hash = req.params.hash;
  await getGameStatus(hash);
  let content = fs.readFileSync('dist/app/game/games/ludo/ludo.html', 'utf-8');

  content = content.replace('{{hash}}', hash);

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});
