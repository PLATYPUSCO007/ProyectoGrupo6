import { Curso } from "./Curso.interface";

export interface User {
    id?: string;
    _id?: string;
    name: string;
    last_name: string;
    cedula: string;
    telefono: string;
    email: string;
    password?: string;
    rol?: Rol;
    estado: Estado;
    id_curso?: Curso;
    created_at?: Date;
}

export interface Estudiante{
    _id?: string;
    id_user?: string;
    matricula: string;
    codigo_activacion: string;
    supervisor?: string;
    estado: Estado;
    created_at?: string;
}

export interface Supervisor{
    _id?: string;
    id_user?: string;
}

export enum Estado{
    'ACTIVO' = 'activo',
    'INACTIVO' = 'inactivo'
}

export enum Rol{
    'ESTUDIANTE' = 'estudiante',
    'SUPERVISOR' = 'supervisor',
    'TUTOR' = 'tutor'
}