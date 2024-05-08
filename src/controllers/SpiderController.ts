import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { controller, EndpointDefenition} from '../interfaces';
import { QueryResult } from 'pg';
import { DBPool } from '../database';
import { 
    IndividualSpiderResponse, 
    ErrorResponse, 
    AllSpidersResponse,
    SpeciesResponse,
    StatusResponse
} from '../interfaces/Responses';
import {
    AllSpidersRequest,
    FavouriteSpiderRequest
} from '../interfaces/Requests';

@Controller('/api')
export class SpiderController implements controller {
  endpoint!: string;
  endpoints!: { [key: string]: EndpointDefenition; };

  static endpoint = '';
  static endpoints = {}
  
  @Post('/my/spiders')
  async getFavourites(req: Request<FavouriteSpiderRequest>, res: Response<AllSpidersResponse[] | ErrorResponse>) {
    const { rows }: QueryResult<AllSpidersResponse> = await DBPool.query(`
        SELECT
            sp."id" AS id,
            sp."name" AS name,
            sp."photo" AS photo,
            sp2."SpeciesName" AS species,
            s.status AS adoptionStatus
        FROM "UserProfile" up
                 JOIN "SpiderProfile" sp ON sp."id" = ANY(up."spiders")
                 JOIN "AdoptionStatus" s ON s."id" = sp."adoptionStatus"
                 JOIN "Species" sp2 ON sp2."id" = sp."species"
        WHERE up."username" = $1;

    `, [req.body.username]);
    res.send(rows);
  }

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
  
  @Post('/all/spiders')
  async GetAllSpiders(req: Request<AllSpidersRequest>, res: Response<AllSpidersResponse[] | ErrorResponse>) {
      const filters = [];
      const params = [];

      if(req.body.search) {
            filters.push(`sp."name" ILIKE $${params.length + 1}`);
            params.push(`%${req.body.search}%`);
      }

      if (req.body.age) {
          filters.push(`sp."age" = $${params.length + 1}`);
          params.push(req.body.age);
      }

      if (req.body.species) {
          filters.push(`s."SpeciesName" = $${params.length + 1}`);
          params.push(req.body.species);
      }

      if (req.body.status) {
          filters.push(`astatus."status" = $${params.length + 1}`);
          params.push(req.body.status);
      }

      params.push(req.body.limit, req.body.offset);

      const query = `
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
        ${filters.length > 0 ? 'WHERE' : ''} ${filters.join(' AND ')}
        LIMIT $${filters.length + 1}
        OFFSET $${filters.length + 2};`;
    const { rows }: QueryResult<AllSpidersResponse> = await DBPool.query(query, params);
    res.send(rows);
  }

  @Get('/species')
  async GetSpecies(req: Request, res: Response<ErrorResponse | SpeciesResponse[]>) {
    try {
        const { rows } : QueryResult<SpeciesResponse> = await DBPool.query('SELECT "SpeciesName" FROM "Species";');
        res.send(rows);
    } catch (error) {
        res.status(500).send({
            message: 'Error fetching species',
            code: 500
        } as ErrorResponse);
    }
  }

  @Get('/status')
  async GetStatus(req: Request, res: Response<ErrorResponse | StatusResponse[]>) {
      try {
          const { rows } : QueryResult<StatusResponse> = await DBPool.query('SELECT "status" FROM "AdoptionStatus";');
          res.send(rows);
      } catch (error) {
          res.status(500).send({
              message: 'Error fetching status',
              code: 500
          } as ErrorResponse);
      }
  }
  
}