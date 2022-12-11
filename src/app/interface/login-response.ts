import { Authority } from "./authority";

export interface LoginResponse {
    session_id: string,
    authorities: Array<Authority>,
    message: string
}