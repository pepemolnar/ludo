import express from 'express';
import * as fs from 'fs';

export const homeRoutes = express.Router();

homeRoutes.get('/', (req, res) => {
  const content = fs.readFileSync('src/view/home/home.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(content);
});
