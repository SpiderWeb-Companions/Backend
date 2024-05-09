import { DBPool } from "../database";
import { ErrorResponse, SuccesResponse } from "../interfaces";
import { UserDetails } from "../interfaces/UserDetails";
import { fetchUser } from "./fetchUser";
import { getUserDetails } from "./getUserDetails";

export const createUser = async (accessToken: string) : Promise<SuccesResponse | ErrorResponse> => {
    let userDetails : UserDetails = await getUserDetails(accessToken);
    debugger;
    if(userDetails.error != undefined){
        return {
            message:  userDetails.error_description,
            code: 500
        } as ErrorResponse;
       
    }
    let rows = userDetails.email ? await fetchUser(userDetails.email): undefined;
    if (rows === undefined){
        return {
            message: "email does not exist on users google oauth",
            code: 500
        } as ErrorResponse;
    }
    if (rows != null && rows.length >= 1){
        return {
            message: "User already exists",
            code: 300
        } as SuccesResponse;
    }
    debugger;
    try {
        debugger;
      await DBPool.query(`
        INSERT INTO "UserProfile" ("username", "ProfilePicture", "address","spiders")
        VALUES ($1, $2, 'no address', '{}');
      `,
      [userDetails.email, userDetails.picture]);
      return {
        message: "User created successfully",
        code: 200
    } as SuccesResponse;

    } catch (error) {
        return {
            message: "Error inserting user details into database",
            code: 500
        } as ErrorResponse;
    }
  }