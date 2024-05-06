import { Request, Response } from 'express';
import { Controller, Get, Post} from "../decorators";
import { controller, EndpointDefenition } from '../interfaces';
import { ErrorResponse, AuthResponse } from '../interfaces/Responses';


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
    let token : AuthResponse | undefined;
    try {
      token = await authenticateUser(tokenURL);
    } catch (error) {
      res.status(500).send({
        error: 'Internal server error',
        error_description: 'server failed to hit the google api at all'
      } as AuthResponse);
    }
    console.log(token)
    console.log(tokenURL)
    if (!token){
      res.status(500).send({
        error: 'Internal server error',
        error_description: 'server hit the google api but the token returned'
      } as AuthResponse);
    } else if (!token.error){
      res.status(500).send(
        token as AuthResponse
      )
    } else {
      res.status(200).send(token as AuthResponse)
    }
  }  
}

const authenticateUser = async (tokenUrl:string) => {
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

export const isAuthenticated = async (accessToken:string) => {
  if (accessToken){
    let response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.status == 200

  }else{
    return false
  }

}

export const getUserDetails = async (accessToken:string) =>{

  if (await isAuthenticated(accessToken) ){
    let response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.json()

  }else{
    return {
      message: 'user is not authenticated'
    }
  }

}