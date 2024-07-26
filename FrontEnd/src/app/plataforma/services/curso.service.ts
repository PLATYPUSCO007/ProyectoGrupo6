import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Curso } from '../../interfaces/Curso.interface';
import { ResponseCreate, ResponsePaginate } from '../../interfaces/Responses.interface';
import { LoginService } from '../../login/services/loginService/login.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private http = inject(HttpClient);
  private loginService = inject(LoginService);
  private URL_BASE = environments.url_api;
  private listCursos: Curso[] = [];

  get listOfCursos(): Curso[]{
    return this.listCursos;
  }

  postCurso(curso: Curso): Observable<Curso>{
    return this.http.post<ResponseCreate>(`${this.URL_BASE}api/curso/register`, curso, {headers: this.loginService.getHeader()})
      .pipe(
        map((result)=>result.object as Curso),
        catchError((e)=>{
          console.error(e);
          return throwError('Error al crear el registro!');
        })
      )
  }

  getCursos(page: number = 1): Observable<Curso[]>{
    return this.http.get<ResponsePaginate>(`${this.URL_BASE}api/curso/list/${page}`)
      .pipe(
        map((result)=>result.object as Curso[]),
        tap((cursos)=> this.listCursos=cursos),
        catchError((e)=>{
          console.error(e);
          return throwError('Error al devolver el listado de cursos.');
        })
      )
  }

  updateCursos(curso: Curso): Observable<Curso>{
    return this.http.put<ResponseCreate>(`${this.URL_BASE}api/curso/update/${curso.id}`, curso)
      .pipe(
        map((result)=>result.object as Curso),
        catchError((e)=>{
          console.error(e);
          return throwError('Error al actualizar el cursos.');
        })
      )
  }

  constructor() { }
}
