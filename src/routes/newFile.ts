import type { Request, Response } from 'express';
import { createGame } from '../controllers/gameController';
import { gameRoutes } from './gameRoutes';

gameRoutes.get('/', (req: Request, res: Response) => {
  const gameID = req.params.gameID;

  if (!gameID) {
    const gameId = createGame();
    res.status(200).send();
  }

  // const gameStatus = getGameStatus(gameID);
  const content = fs.readFileSync('view/home/home.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(gameStatus);
});
