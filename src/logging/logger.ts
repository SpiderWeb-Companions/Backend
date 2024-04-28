import { Colours } from "../enums";

export class Logger {
    public static debug(message: string) {
        console.log(`${Colours.FgGreen} ${this.getCurrentTime()} ${Colours.Reset}${Colours.FgBlue}[Debug]${Colours.Reset} ${message}`);
    }

    public static info(message: string) {
        console.log(`${Colours.FgGreen} ${this.getCurrentTime()} ${Colours.Reset}${Colours.FgYellow}[Info]${Colours.Reset} ${message}`);
    }

    public static error(message: string) {
        console.log(`${Colours.FgGreen} ${this.getCurrentTime()} ${Colours.Reset}${Colours.FgRed}[Error]${Colours.Reset} ${message}`);
    }
    
    private static getCurrentTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(4, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
}