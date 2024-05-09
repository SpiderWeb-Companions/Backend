export interface IndividualSpiderResponse {
    id: number;
    name: string;
    age: number;
    story: string;
    health: string;
    photo: string;
    species: string;
    gender: string;
    adoptionStatus: string;
}

export interface AllSpidersResponse {
    id: number;
    name: string;
    photo: string;
    species: string;
    adoptionstatus: string;
}

export interface CountResponse {
    count: number;
}