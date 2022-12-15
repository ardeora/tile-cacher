import express, { Request, Response } from 'express';
const app = express();

import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { darkTiles } from './tile';

app.use('/', darkTiles);

app.get('/*', async (req: Request, res: Response) => {
  res.send('GNUI Map Tiles Cacher');
});

const PORT = 3009;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(`Error occured: ${error.message}`);
  }
}
