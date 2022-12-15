// Express router to serve tiles
import axios from 'axios';
import express, { Application, Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const imgPath = path.join(__dirname, '../tiles/gnui-dark');

// fs.readFile('image.png', (err, data) => {
//   if (err) {
//     console.error(err);
//     return res.sendStatus(500);
//   } else {
//     res.set('Content-Type', 'image/png');
//     return res.send(data);
//   }
// });

// const response = await axios.get(
//   'https://api.mapbox.com/styles/v1/grnoc/clbjobgfi002814pbkieyll14/tiles/0/0/0?access_token=pk.eyJ1IjoiZ3Jub2MiLCJhIjoiY2ttMmJvcWt4MXB3cDJucWVxN2ltZ2JoOCJ9.ZKpOkAW4qvdQZoX_Rk18QQ',
//   {
//     responseType: 'stream',
//   },
// );

// response.data.pipe(fs.createWriteStream('image.png'));

const darkTiles = router.get('/gnui-dark/:z/:x/:y.png', async (req: Request, res: Response) => {
  const { z, x, y } = req.params;
  const filePath = path.join(imgPath, `${z}-${x}-${y}.png`);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    res.set('Content-Type', 'image/png');
    console.log('Hitting Cache');
    return res.send(fileContent);
  }
  const response = await axios.get({
    responseType: 'stream',
  });
  console.log('Hitting Mapbox');
  response.data.pipe(fs.createWriteStream(imgPath + '/0-0-0.png'));
  return response.data.pipe(res);
});

export { darkTiles };
