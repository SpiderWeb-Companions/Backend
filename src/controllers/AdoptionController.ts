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
  async adopt(req: Request<AdoptRequest>, res: Response<any| ErrorResponse>) {
    try {
      const { rows } = await DBPool.query(`
        INSERT INTO "AdoptionForm" (
          "FirstName",
          "LastName",
          "email",
          "phone",
          "address",
          "experience",
          "reason",
          "comments"
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        ) RETURNING *;
      `, [
        req.body.FirstName,
        req.body.LastName,
        req.body.Email,
        req.body.Phone,
        req.body.Address,
        req.body.Experience,
        req.body.AdoptionReason,
        req.body.Comments
      ]);
    } catch (error) {
      res.status(500).send({
        message: 'Spider not found',
        code: 500
      } as ErrorResponse);
      return;
    }
    res.send({
      message: 'Adoption form submitted',
      code: 200
    } as SuccesResponse);
  }
}