export interface Estudiante{
    id?: string;
    nombre: string;
    apellido: string;
    cedula: string;
    telefono: string;
    email: string;
    password?: string;
    created_at?: Date;
    matricula: string;
    codigo_activacion: string;
    supervisor: string;
    estado: Estado;
}

export enum Estado{
    'ACTIVO' = 'activo',
    'REGISTRADO' = 'registrado',
    'INACTIVO' = 'inactivo'
}