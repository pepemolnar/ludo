import express from 'express';
import { generalRoutes } from './generalRoutes';
import { gameRoutes } from './gameRoutes';

export const routes = express.Router();

routes.use(express.static('dist/app'));
routes.use('/', generalRoutes);
routes.use('/game', gameRoutes);

export default routes;
