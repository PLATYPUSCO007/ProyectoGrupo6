export interface Paquete{
    id?: string;
    titulo: string;
    descripcion: string;
    categoria: CategoriaPaquete;
    imagen?: string;
    cursos: string[];
    created_at?: Date;
}

export enum CategoriaPaquete{
    'INGENIERIA'='ingenieria',
    'HABILIDADES BLANDAS'='habilidades blandas',
    'MATEMATICAS'='matematicas',
    'RH'='rh'
}