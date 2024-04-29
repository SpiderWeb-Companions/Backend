import { HttpMethod } from "../enums";

export function HttpMethodDecorator(method: HttpMethod, route: string, controller: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        controller.endpoints[route] = {
            method: method,
            handler: descriptor.value
        }
    }
}
