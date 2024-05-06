import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';
import { DBPool } from '../database';
import { ContactRequest } from '../interfaces/Requests';
import { ErrorResponse, SuccesResponse } from '../interfaces/Responses';
import { send } from "../util";

@Controller('/api')
export class ContactController implements controller {
  endpoint!: string;
  endpoints!: { [key: string]: EndpointDefenition; };

  static endpoint = '';
  static endpoints = {}
  
  @Post('/contact')
  async ContactUs(req: Request<ContactRequest>, res: Response<SuccesResponse | ErrorResponse>) {
    try {
      await DBPool.query(`
        INSERT INTO "ContactUS" ("FirstName", "Email", "Message")
        VALUES ($1, $2, $3);
      `,
      [req.body.name, req.body.email, req.body.message]);
      await send(
          req.body.email,
          "We have received your message and will get back to you",
          "Spider Web contact"
      );
    } catch (error) {
      res.status(500).send({
        message: 'Internal server error',
        code: 500
      } as ErrorResponse);
    }
    res.send({
      message: 'Message sent successfully',
      code: 200
    } as SuccesResponse);
  }
  
}