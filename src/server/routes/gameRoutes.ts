import type { Request, Response } from 'express';
import express from 'express';
import * as fs from 'fs';
import { GameController } from '../controllers/gameController';

export const gameRoutes = express.Router();

const gameController = new GameController();

gameRoutes.get('/', (_req: Request, res: Response) => {
  const content = fs.readFileSync('src/app/game/game.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});

gameRoutes.post('/new', async (req: Request, res: Response) => {
  const selectedGame = req.body.selectedGame;
  const gameId = await gameController.createGame(selectedGame);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ gameId });
});

gameRoutes.get('/:hash/roll', async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const response = await gameController.rollTheDice(hash);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(response);
});

gameRoutes.post('/:hash/step', async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const respone = await gameController.moveWithPlayer(hash, req.body);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(respone);
});

gameRoutes.get('/:hash/status', async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const status = await gameController.getGameStatus(hash);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(status);
});

gameRoutes.get('/:hash', async (req: Request, res: Response) => {
  const hash = req.params.hash;
  await gameController.getGameStatus(hash);
  let content = fs.readFileSync('dist/app/game/games/ludo/ludo.html', 'utf-8');

  content = content.replace('{{hash}}', hash);

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});
