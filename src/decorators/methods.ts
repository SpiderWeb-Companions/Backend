import { HttpMethod } from "../enums";
import { IController } from "../interfaces";


export function Get(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as IController;
        controller.endpoints[route] = {
            method: HttpMethod.GET,
            handler: descriptor.value
        }
    }
}

export function Post(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as IController;
        controller.endpoints[route] = {
            method: HttpMethod.POST,
            handler: descriptor.value
        }
    }
}

export function Delete(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as IController;
        controller.endpoints[route] = {
            method: HttpMethod.DELETE,
            handler: descriptor.value
        }
    }
}

export function Patch(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as IController;
        controller.endpoints[route] = {
            method: HttpMethod.PATCH,
            handler: descriptor.value
        }
    }
}

export function Put(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as IController;
        controller.endpoints[route] = {
            method: HttpMethod.PUT,
            handler: descriptor.value
        }
    }
}
