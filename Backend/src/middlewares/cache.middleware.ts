// src/middlewares/cache.middleware.ts
import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Create Redis client
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setexAsync = promisify(redisClient.setEx).bind(redisClient);

// Cache middleware
export const cache = (duration: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = '__express__' + req.originalUrl || req.url;
    
    try {
      const cachedData = await getAsync(key);
      if (cachedData) {
        res.send(JSON.parse(cachedData));
        return;
      }
      
      // Override res.send to cache the response
      const originalSend = res.send;
      res.send = function (body) {
        if (res.statusCode === 200) {
          setexAsync(key, duration, JSON.stringify(body));
        }
        return originalSend.call(this, body);
      };
      
      next();
    } catch (err) {
      console.error('Redis error:', err);
      next();
    }
  };
};