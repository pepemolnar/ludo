import express from 'express';
import { homeRoutes } from './homeRoutes';
import { userRoutes } from './userRoutes';
import { gameRoutes } from './gameRoutes';

export const routes = express.Router();

routes.use(homeRoutes);
routes.use('/user', userRoutes);
routes.use('/game', gameRoutes);
routes.use(express.static('dist/view'));
