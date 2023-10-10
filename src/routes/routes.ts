import express from 'express';
import { homeRoutes } from './home';
import { userRoutes } from './user';

export const routes = express.Router();

routes.use(homeRoutes);
routes.use('/user', userRoutes);
routes.use(express.static('src/view'));
