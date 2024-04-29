import { HttpMethod } from "../enums";
import { HttpMethodDecorator } from "./HttpMethodDecorator";


export function Get(route: string, controller: any) {
    return HttpMethodDecorator(HttpMethod.GET, route, controller);
}

export function Post(route: string, controller: any) {
    return HttpMethodDecorator(HttpMethod.POST, route, controller);
}

export function Delete(route: string, controller: any) {
    return HttpMethodDecorator(HttpMethod.DELETE, route, controller);
}

export function Patch(route: string, controller: any) {
    return HttpMethodDecorator(HttpMethod.PATCH, route, controller);
}

export function Put(route: string, controller: any) {
    return HttpMethodDecorator(HttpMethod.PUT, route, controller);
}
