import type { Request, Response } from 'express';
import express from 'express';
import { createGame, rollTheDice } from '../controllers/gameController';
import * as fs from 'fs';

export const gameRoutes = express.Router();

gameRoutes.get('/', (req: Request, res: Response) => {
  console.log('asfd');
  const content = fs.readFileSync('src/app/game/game.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});

gameRoutes.get('/new', (req: Request, res: Response) => {
  const gameId = createGame();
  res.status(200).json({ gameId });

  // const gameStatus = getGameStatus(gameID);
});

gameRoutes.get('/:gameId', (req: Request, res: Response) => {
  const gameId = req.params.gameId;
  let content = fs.readFileSync('dist/app/game/games/ludo/ludo.html', 'utf-8');

  content = content.replace('{{gameId}}', gameId);

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});

gameRoutes.get('/:gameId/roll', (req: Request, res: Response) => {
  const response = rollTheDice();
  res.setHeader('Content-Type', 'text/html');
  res.status(200).json(response);
});

gameRoutes.post('/:gameId/step', (req: Request, res: Response) => {
  const winner = String(req.query.gameID);
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<h1>Winner is ${winner}</h1>`);
});
