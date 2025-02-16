import { User } from "./user";

export interface LoginResponse {
    token: string;
    expiresIn: string;
    user: User;
}
