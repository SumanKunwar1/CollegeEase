import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to prevent caching of API responses
 * Sets Cache-Control header to no-store with max-age=0
 */
export const cacheControl = (req: Request, res: Response, next: NextFunction) => {
  res.set('Cache-Control', 'no-store, max-age=0');
  next();
};