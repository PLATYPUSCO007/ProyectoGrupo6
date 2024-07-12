import { Estudiante, Supervisor, User } from "../../interfaces/Roles.interface";

export interface LoginData{
    email: string;
    password: string
}

export interface LoginResponse{
    status: string;
    message: string;
    token: string;
    user: User;
}