import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';
import { DBPool } from '../database';
import { ErrorResponse } from '../interfaces/Responses';
import { AdoptRequest } from '../interfaces/Requests';
import { SuccesResponse } from '../interfaces/Responses/Succes';

@Controller('/api')
export class AdoptionController implements controller {
  endpoint!: string;
  endpoints!: { [key: string]: EndpointDefenition; };

  static endpoint = '';
  static endpoints = {}

  @Post('/adopt')
  async adopt(req: Request<AdoptRequest>, res: Response<SuccesResponse| ErrorResponse>) {
    try {
      await DBPool.query(`
        SELECT adopt_spider($1, $2, $3, $4 )
      `, [
        req.body.Email,
        req.body.AdoptionReason,
        req.body.Comments,
        req.body.SpiderID
      ]);
    } catch (error) {
      res.status(404).send({
        message: 'Spider not found',
        code: 404
      } as ErrorResponse);
      return;
    }
    res.send({
      message: 'Adoption form submitted',
      code: 200
    } as SuccesResponse);
  }
}