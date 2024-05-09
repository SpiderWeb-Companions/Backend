import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';
import { ErrorResponse, AuthResponse, SuccesResponse } from '../interfaces/Responses';
import { authenticateUser } from '../util/authenticate';
import { createUser } from '../util/createUser';


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
        error_description: 'Server failed to hit the google api at all'
      } as AuthResponse);
    }
    if (!token){
      res.status(500).send({
        error: 'Internal server error',
        error_description: 'Server hit the google api but the token returned was not saved'
      } as AuthResponse);
    } else if (token.error!=undefined){
      res.status(500).send(
        token as AuthResponse
      )
    } else {
      let createUserResponse : SuccesResponse | ErrorResponse = token?.access_token ? await createUser(token.access_token) : {code: 500, message: "For some reason the Auth token doesn't exist even though google successfully returned a token"} as ErrorResponse;
      switch (createUserResponse.code) {
        case 200:
          res.status(200).send({user_created: true , ...token} as AuthResponse);
          break;
        case 300:
          res.status(200).send({user_created: false , ...token} as AuthResponse);
          break;
        case 500:
          res.status(500).send({user_created: false , error: "user_not_created", error_description: createUserResponse.message} as AuthResponse);
          break;
          default:
          res.status(500).send({error: "eish" , error_description: createUserResponse.message} as AuthResponse);
          break;
      }
    }
  }  
}
