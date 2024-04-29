export interface IController {
    endpoint: string;
    endpoints: { [key: string]: { method: string, handler: Function } };
}