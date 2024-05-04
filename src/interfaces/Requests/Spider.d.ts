import { status } from "../../types";
export interface AllSpidersRequest {
    limit: number;
    search: string | undefined;
    age: number | undefined;
    species: string | undefined; // Should this be a type?
    status: status | undefined;
}

export interface FavouriteSpiderRequest {
    username: string;
}