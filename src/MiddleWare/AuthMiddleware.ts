import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logging/logger';
import { isAuthenticated } from "../util/isAuthenticated";

export async function validateAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if (['GET', 'POST', 'PUT'].includes(req.method)) {
    let token: string | string[] | undefined = req.headers['Authorization'];
    if (token && !Array.isArray(token)) {
      let isAuth: boolean = await isAuthenticated(token);
      Logger.debug(`${req.method} ${req.url} ${req.headers['Authorization']} `);
      next();
    }
    return;
  }
  Logger.debug(`failed: ${req.method} ${req.url} ${req.headers['Authorization']} `);
}
