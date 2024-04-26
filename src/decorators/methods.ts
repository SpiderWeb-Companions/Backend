import { HttpMethod } from "../enums";
import { HttpMethodDecorator } from "./HttpMethodDecorator";


export function Get(route: string) {
    return HttpMethodDecorator(HttpMethod.GET, route);
}

export function Post(route: string) {
    return HttpMethodDecorator(HttpMethod.POST, route);
}

export function Delete(route: string) {
    return HttpMethodDecorator(HttpMethod.DELETE, route);
}

export function Patch(route: string) {
    return HttpMethodDecorator(HttpMethod.PATCH, route);
}

export function Put(route: string) {
    return HttpMethodDecorator(HttpMethod.PUT, route);
}
