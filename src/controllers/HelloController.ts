import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { IController } from '../interfaces';

@Controller('/api')
export class HelloController implements IController{
  endpoint!: string;
  endpoints: { [key: string]: { method: string; handler: Function; }; } = {}
  static endpoints = {}
  

  @Get('/hello', HelloController)
  hello(req: Request, res: Response) {
    res.send('Hello, World!');
  }

  @Post('/echo', HelloController)
  echo(req: Request, res: Response) {
    const { message } = req.body;
    res.send(`You said: ${message}`);
  }
  
}