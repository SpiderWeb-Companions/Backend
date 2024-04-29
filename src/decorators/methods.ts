import { HttpMethod } from "../enums";
import { controller } from "../interfaces";
import { HttpMethods } from "../types";


export function Get(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as controller;
        controller.endpoints[route] = {
            method: 'get' as HttpMethods,
            handler: descriptor.value
        }
    }
}

export function Post(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as controller;
        controller.endpoints[route] = {
            method: 'post' as HttpMethods,
            handler: descriptor.value
        }
    }
}

export function Delete(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as controller;
        controller.endpoints[route] = {
            method: HttpMethod.DELETE,
            handler: descriptor.value
        }
    }
}

export function Patch(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as controller;
        controller.endpoints[route] = {
            method: HttpMethod.PATCH,
            handler: descriptor.value
        }
    }
}

export function Put(route: string) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const controller = target.constructor as unknown as controller;
        controller.endpoints[route] = {
            method: HttpMethod.PUT,
            handler: descriptor.value
        }
    }
}
