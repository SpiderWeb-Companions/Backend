import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";

@Controller('/api')
export class HelloController{

  @Get('/hello')
  hello(req: Request, res: Response) {
    res.send('Hello, World!');
  }

  @Post('/echo')
  echo(req: Request, res: Response) {
    const { message } = req.body;
    res.send(`You said: ${message}`);
  }
  
}