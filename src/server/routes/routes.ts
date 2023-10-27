import express from 'express';
import { homeRoutes } from './homeRoutes';
import { gameRoutes } from './gameRoutes';

export const routes = express.Router();

routes.use(express.static('dist/app'));
routes.use(homeRoutes);
routes.use('/game', gameRoutes);
