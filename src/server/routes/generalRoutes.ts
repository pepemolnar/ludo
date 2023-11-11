import type { Request, Response } from 'express';
import express from 'express';
import { GeneralController } from '../controllers/GeneralController';

export const generalRoutes = express.Router();

const generalController = new GeneralController();

generalRoutes.get('/', generalController.getHomePage);
generalRoutes.get('/login', generalController.getLoginPage);
generalRoutes.get('/register', generalController.getRegisterPage);

generalRoutes.post('/login', generalController.login);
generalRoutes.post('/register', generalController.register);

generalRoutes.get('/game-over', (req: Request, res: Response) => {
  const winner = String(req.query.winner);
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<h1>Winner is ${winner}</h1>`);
});
