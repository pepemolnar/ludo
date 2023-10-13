import type { Request, Response } from 'express';
import express from 'express';
import {
  createGame,
  getGameStatus,
  stepWithFigure
} from '../controllers/gameController';
import * as fs from 'fs';

export const gameRoutes = express.Router();

gameRoutes.get('/', (req: Request, res: Response) => {
  const gameID = req.params.gameID;

  if (!gameID) {
    const gameId = createGame();
    res.status(200).send();
  }

  // const gameStatus = getGameStatus(gameID);
  const content = fs.readFileSync('view/home/home.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});

gameRoutes.get('/roll', (req: Request, res: Response) => {
  const winner = String(req.query.gameID);
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<h1>Winner is ${winner}</h1>`);
});

gameRoutes.post('/step', (req: Request, res: Response) => {
  const winner = String(req.query.gameID);
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<h1>Winner is ${winner}</h1>`);
});
