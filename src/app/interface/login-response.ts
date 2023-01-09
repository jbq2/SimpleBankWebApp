import { Authority } from "./authority";

export interface LoginResponse {
    jwt: string,
    message: string
}