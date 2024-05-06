
export const isAuthenticated = async (accessToken: string) => {
  if (accessToken) {
    let response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.status == 200;

  } else {
    return false;
  }

};
