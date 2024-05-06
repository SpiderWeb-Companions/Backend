import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';
import { DBPool } from '../database';
import { env } from 'process';

interface authResponseBody {
  message: string;
  isAuthed:boolean;
}

@Controller('/api')
export class AuthController implements controller {
  // Define these to make the interface happy
  endpoint!: string;
  endpoints!: { [key: string]: EndpointDefenition; };
  // define these to make the array in index.ts happy
  static endpoint = '';
  static endpoints = {}


  @Post('/auth')
  async echo(req: Request, res: Response) {
    const { code } = req.body;

    const clientId = process.env.CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI;
    const clientSecret = process.env.CLIENT_SECRET;

    let tokenURL =`https://oauth2.googleapis.com/token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code&code=${code}`
    let token;
    try {
      token = await authenticateUser(tokenURL);
    } catch (error) {
      res.send({
        message: 'Oof'
      })
    }

    
    console.log(token)
    console.log(tokenURL)

    res.send(token)

  }


  
}

const authenticateUser  = async (tokenUrl:string) => {
  //let response = await fetch(`${AuthController.authUrl}?scope=${AuthController.scope}&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}`)
  let response = await fetch(tokenUrl, {
        method: "POST",
        body: '',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin" : "*"
        }
      });
    
  return response.json();
 
}