import { Application } from 'express';
import { IController } from './interfaces';

export function registerControllers(app: Application, controllers: IController[]) {
    controllers.forEach((controller) => {
        for (const [key, value] of Object.entries(controller.endpoints)) {
            const method: keyof Application = value.method as keyof Application;
            app[method](controller.endpoint + key, value.handler);
        }
    });
}
