import { Application } from 'express';

// Sorry for any :(
export function registerControllers(app: Application, controllers: any[]) {
    controllers.forEach((controller) => {
        const instance = new controller();
        const basePath = Reflect.getMetadata('path', controller);
        Object.getOwnPropertyNames(controller.prototype).forEach((methodName) => {
            const route = Reflect.getMetadata('route', controller.prototype, methodName);
            const method: keyof Application = Reflect.getMetadata('method', controller.prototype, methodName);
            if (route && method) {
                app[method](basePath + route, instance[methodName].bind(instance));
            }
        });
    });
}
