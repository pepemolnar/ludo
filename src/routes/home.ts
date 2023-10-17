import type { Request, Response } from 'express';
import express from 'express';
import * as fs from 'fs';

export const homeRoutes = express.Router();

homeRoutes.get('/16', (req, res) => {
  const content = fs.readFileSync('src/view/home/map_16/home.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});

homeRoutes.get('/20', (req, res) => {
  const content = fs.readFileSync('src/view/home/map_20/home.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});

homeRoutes.get('/24', (req, res) => {
  const content = fs.readFileSync('src/view/home/map_24/home.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});

homeRoutes.get('/game-over', (req: Request, res: Response) => {
  const winner = String(req.query.winner);
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<h1>Winner is ${winner}</h1>`);
});
