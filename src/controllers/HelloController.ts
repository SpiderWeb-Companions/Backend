import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { IController } from '../interfaces';

@Controller('/api')
export class HelloController implements IController {
  // Define these to make the interface happy
  endpoint!: string;
  endpoints!: { [key: string]: { method: string; handler: Function; }; };
  // define these to make the array in index.ts happy
  static endpoint = '';
  static endpoints = {}
  

  @Get('/hello')
  hello(req: Request, res: Response) {
    res.send('Hello, World!');
  }

  @Post('/echo')
  echo(req: Request, res: Response) {
    res.send(`You said: hey`);
  }
  
}