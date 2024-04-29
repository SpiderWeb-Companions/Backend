import { Application } from 'express';
import { IController, EndpointDefenition } from './interfaces';

// Sorry for any :(
export function registerControllers(app: Application, controllers: IController[]) {
    controllers.forEach((controller) => {
        for (const [key, value] of Object.entries(controller.endpoints)) {
                const method: keyof Application = (value as any).method;
                app[method](controller.endpoint + key, (value as any).handler);
            }
    });
}
