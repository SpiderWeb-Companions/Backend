import { isAuthenticated } from "./isAuthenticated";


export const getUserDetails = async (accessToken: string) => {
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
      message: 'user is not authenticated'
    };
  }
};
