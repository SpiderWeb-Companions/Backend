export const authenticateUser = async (tokenUrl: string) => {
  let response = await fetch(tokenUrl, {
    method: "POST",
    body: '',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    }
  });

  return response.json();

};


