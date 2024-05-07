import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';
import { ErrorResponse, AuthResponse } from '../interfaces/Responses';
import { authenticateUser } from '../util/authenticate';


@Controller('/api')
export class AuthController implements controller {
  // Define these to make the interface happy
  endpoint!: string;
  endpoints!: { [key: string]: EndpointDefenition; };
  // define these to make the array in index.ts happy
  static endpoint = '';
  static endpoints = {}
  static clientId = process.env.CLIENT_ID;
  static redirectUri = process.env.REDIRECT_URI;
  static clientSecret = process.env.CLIENT_SECRET;


  @Post('/auth')
  async Authenticate(req: Request, res: Response<AuthResponse>) {
    const { code } = req.body; 

    let tokenURL =`https://oauth2.googleapis.com/token?client_id=${AuthController.clientId}&client_secret=${AuthController.clientSecret}&redirect_uri=${AuthController.redirectUri}&grant_type=authorization_code&code=${code}`
    let token : AuthResponse | undefined;
    try {
      token = await authenticateUser(tokenURL);
    } catch (error) {
      res.status(500).send({
        error: 'Internal server error',
        error_description: 'server failed to hit the google api at all'
      } as AuthResponse);
    }
    if (!token){
      res.status(500).send({
        error: 'Internal server error',
        error_description: 'server hit the google api but the token returned'
      } as AuthResponse);
    } else if (token.error!=undefined){
      res.status(500).send(
        token as AuthResponse
      )
    } else {
      res.status(200).send(token as AuthResponse)
    }
  }  
}