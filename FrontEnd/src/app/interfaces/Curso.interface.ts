export interface Curso{
    id?: string;
    titulo: string;
    categoria?: CategoriasCurso;
    descripcion: string;
    duracion?: number;
    imagen: string;
    created_at?: string;
}

export enum CategoriasCurso{
    'COMPUTACION EN LA NUBE'='computacion en la nube',
    'BASE DE DATOS'='base de datos',
    'PROGRAMACION'='programacion',
    'SEGURIDAD'='seguridad'
}