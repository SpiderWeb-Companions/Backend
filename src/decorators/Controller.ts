export function Controller(path: string) {
    return function (constructor: any) {
        constructor.endpoint = path;
    };
}
