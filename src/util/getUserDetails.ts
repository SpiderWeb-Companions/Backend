import { UserDetails } from "../interfaces/UserDetails";
import { isAuthenticated } from "./isAuthenticated";


export const getUserDetails = async (accessToken: string) : Promise<UserDetails>=> {
  if (await isAuthenticated(accessToken)) {
    let response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.json();

  } else {
    return {
      error_description: 'Response from trying to fetch user info is not defined, the fetch function is failing before hitting googles endpoint.'
    };
  }
};
