import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logging/logger';
import { isAuthenticated } from "../util/isAuthenticated";

const unauth = ['/api/hello', 'api/auth'];
const allowedMethods = ['GET', 'POST', 'PUT'];

export async function validateAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if(unauth.includes(req.url)) {
    Logger.info(`Unauthed route: ${req.url}`);
    next();
    return;
  }
  if (allowedMethods.includes(req.method)) {
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
