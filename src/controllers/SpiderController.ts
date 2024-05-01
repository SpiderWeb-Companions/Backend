import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';
import { QueryResult } from 'pg';
import { DBPool } from '../database';
import { 
    IndividualSpiderResponse, 
    ErrorResponse, 
    AllSpidersResponse 
} from '../interfaces/Responses';

@Controller('/api')
export class SpiderController implements controller {
  endpoint!: string;
  endpoints!: { [key: string]: EndpointDefenition; };

  static endpoint = '';
  static endpoints = {}
  

  @Get('/spider/:id')
  async GetSpiderById(req: Request, res: Response<IndividualSpiderResponse | ErrorResponse>) {
    const { id } = req.params;
    const { rows }: QueryResult<IndividualSpiderResponse> = await DBPool.query(`
        SELECT
            sp."id",
            sp."name",
            sp."age",
            sp."story",
            sp."heatlh",
            sp."photo",
            s."SpeciesName",
            s."experience" AS "speciesExperience",
            s."temprement",
            s."habitat",
            s."food",
            ss."sex" AS gender,
            astatus."status" AS "adoptionStatus"
        FROM
            "SpiderProfile" sp
            JOIN "Species" s ON sp."species" = s."id"
            JOIN "SpiderSex" ss ON sp."sex" = ss."id"
            JOIN "AdoptionStatus" astatus ON sp."adoptionStatus" = astatus."id"
        WHERE sp."id" = $1;
    `,
    [id]);
    if (rows.length === 0) {
        res.status(404).send({
            message: 'Spider not found',
            code: 404
        
        } as ErrorResponse);
        return;
    }
    res.send(rows[0]);
  }
  
  @Get('/all/spiders/:limit')
  async GetAllSpiders(req: Request, res: Response<AllSpidersResponse[] | ErrorResponse>) {
    const { limit } = req.params;
    const { rows }: QueryResult<AllSpidersResponse> = await DBPool.query(`
        SELECT
            sp."id",
            sp."name",
            sp."photo",
            s."SpeciesName" AS species,
            astatus."status" AS "adoptionStatus"
        FROM
            "SpiderProfile" sp
            JOIN "Species" s ON sp."species" = s."id"
            JOIN "AdoptionStatus" astatus ON sp."adoptionStatus" = astatus."id"
        LIMIT $1;
    `,
    [limit]);
    if (rows.length === 0) {
        res.status(404).send({
            message: 'No spiders available for adoption, check back later',
            code: 404
        
        } as ErrorResponse);
        return;
    }
    res.send(rows);
  }
  
}