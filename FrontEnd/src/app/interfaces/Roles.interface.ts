export interface User {
    id?: string;
    name: string;
    last_name: string;
    cedula: string;
    telefono: string;
    email: string;
    password?: string;
    created_at?: Date;
    role?: Estudiante | Supervisor;
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
    'REGISTRADO' = 'registrado',
    'INACTIVO' = 'inactivo'
}