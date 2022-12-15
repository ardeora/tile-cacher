// Express router to serve tiles
import axios from 'axios';
import express, { Application, Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const imgPath = path.join(__dirname, '../tiles/gnui-dark');

const MapboxAPI = 'https://api.mapbox.com/styles/v1';

const darkTiles = router.get('/gnui-dark/:z/:x/:y.png', async (req: Request, res: Response) => {
  const { z, x, y } = req.params;
  const filePath = path.join(imgPath, `${z}-${x}-${y}.png`);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    res.set('Content-Type', 'image/png');
    console.log('Hitting Cache');
    return res.send(fileContent);
  }

  const apiURL = `${MapboxAPI}/${process.env.DARK_TILE_ID}/tiles/${z}/${x}/${y}?access_token=${process.env.MAPBOX_API_KEY}`;

  console.log(apiURL);

  const response = await axios.get(apiURL, {
    responseType: 'stream',
  });
  console.log('Hitting Mapbox');
  response.data.pipe(fs.createWriteStream(imgPath + `/${z}-${x}-${y}.png`));
  return response.data.pipe(res);
});

const lightTiles = router.get('/gnui-light/:z/:x/:y.png', async (req: Request, res: Response) => {
  const { z, x, y } = req.params;
  const filePath = path.join(imgPath, `${z}-${x}-${y}.png`);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    res.set('Content-Type', 'image/png');
    console.log('Hitting Cache');
    return res.send(fileContent);
  }

  const apiURL = `${MapboxAPI}/${process.env.LIGHT_TILE_ID}/tiles/${z}/${x}/${y}?access_token=${process.env.MAPBOX_API_KEY}`;

  console.log(apiURL);

  const response = await axios.get(apiURL, {
    responseType: 'stream',
  });
  console.log('Hitting Mapbox');
  response.data.pipe(fs.createWriteStream(imgPath + `/${z}-${x}-${y}.png`));
  return response.data.pipe(res);
});

export { darkTiles };
