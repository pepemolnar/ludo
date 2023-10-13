/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { addUser, getUserById } from '../controllers/userController';

export const userRoutes = express.Router();

userRoutes.get('/:id', getUserById);

userRoutes.post('/new', addUser);
