import type { Request, Response } from 'express';
import express from 'express';
import * as fs from 'fs';

export const homeRoutes = express.Router();

homeRoutes.get('/', (req, res) => {
  const content = fs.readFileSync('src/view/home/home.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});

homeRoutes.get('/game-over', (req: Request, res: Response) => {
  const winner = String(req.query.winner);
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<h1>Winner is ${winner}</h1>`);
});
