import { Curso } from "./Curso.interface";
import { User } from "./Roles.interface";

export interface ResponsePaginate {
    status:        string;
    object:         User[] | Curso[];
    totalDocs:     number;
    totalPages:    number;
    page:          number;
    pagingCounter: number;
    hasPrevPage:   boolean;
    hasNextPage:   boolean;
    prevPage:      null;
    nextPage:      null;
    limit:         number;
}

export interface ResponseCreate {
    status:  string;
    message: string;
    object:    User | Curso;
}