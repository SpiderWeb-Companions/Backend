import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logging/logger';
import { isAuthenticated } from "../util/isAuthenticated";

const unauth = ['/api/hello', '/api/auth'];
const allowedMethods = ['GET', 'POST', 'PUT',];

export async function validateAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if(unauth.includes(req.url)) {
      Logger.info(`Unauthed route: ${req.url}`);
      next();
      return;
    }
    if (req.method== 'OPTIONS'){
      next();
      return;
    }
    if (allowedMethods.includes(req.method)) {
      const token: string | string[] | undefined = req.headers['authorization'];
      if (token && !Array.isArray(token)) {
        const isAuth: boolean = await isAuthenticated(token);
        console.log(isAuth);
        if(isAuth)
          next();
        else
          res.status(401).send("unauthorized");
      } else {
        res.status(401).send("unauthorized");
      }
      return;
    }
    Logger.debug(`failed: ${req.method} ${req.url}  `);
    res.status(401).send("unauthorized");
  } catch (error) {
    Logger.error(`Error occurred at auth ${error}`);
    res.status(500).send("internal server error");
  }
}
