import { Authority } from "./authority";

export interface LoginResponse {
    session_id: string,
    email: string,
    authorities: Array<Authority>,
    message: string
}