export function Controller(path: string) {
    return function (constructor: Function) {
        Reflect.defineMetadata('path', path, constructor);
    };
}
