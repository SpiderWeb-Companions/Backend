import { Application, Router, RequestHandler, IRouter } from 'express';
import { controller } from './interfaces';
import { HttpMethods } from './types';

function isHttpMethod(method: string): method is HttpMethods {
  return (
    method === 'get' ||
    method === 'post' ||
    method === 'put' ||
    method === 'delete' ||
    method === 'patch' ||
    method === 'options' ||
    method === 'head'
  );
}

export function registerControllers(app: Application, controllers: controller[]) {
  controllers.forEach((controller) => {
    const router = Router();
    for (const [key, value] of Object.entries(controller.endpoints)) {
      const method: string = value.method;
      if (isHttpMethod(method)) {
        (router as IRouter)[method](key, value.handler as RequestHandler);
      } else {
        console.warn(`Invalid HTTP method: ${method}`);
      }
    }
    app.use(controller.endpoint, router);
  });
}