import { HttpMethod } from "../enums";

export function HttpMethodDecorator(method: HttpMethod, route: string) {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('route', route, target, propertyKey);
        Reflect.defineMetadata('method', method, target, propertyKey);
    };
}
