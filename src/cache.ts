import { NextFunction, Request, Response } from 'express';

export const cache = (req: Request, res: Response, next: NextFunction): void => {
  // Set cache headers
  res.setHeader('Cache-Control', `public, max-age=${process.env.CACHE_MAX_AGE}`);
  next();
};
