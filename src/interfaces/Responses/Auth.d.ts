export interface AuthResponse {
    access_token?: string,
    expires_in?: number,
    scope?: string,
    token_type?: string,
    id_token?: string,
    error?: string,
    error_description?: string,
    user_created?: boolean,
}
