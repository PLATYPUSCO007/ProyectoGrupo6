import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../../interfaces/Roles.interface';
import { environments } from '../../../environments/environments';
import { ResponseCreate, ResponsePaginate } from '../../interfaces/Responses.interface';
import { LoginService } from '../../login/services/loginService/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_BASE = environments.url_api;
  private http = inject(HttpClient);
  private loginService = inject(LoginService);
  private listUsers: User[] = [];

  set listUser(users: User[]){
    this.listUsers = users;
  }

  get listUser(): User[]{
    return this.listUsers;
  }

  constructor() {     
  }

  getHeader(): HttpHeaders{
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return headers;
  }

  getUsers(page: number = 1): Observable<User[]>{
    return this.http.get<ResponsePaginate>(`${this.URL_BASE}api/user/list/${page}`, {headers: this.getHeader()})
      .pipe(
        map((result)=>{
          return result.object as User[];
        }),
        catchError((e)=>{
          console.error(e);
          return throwError('Error al obtener los registros!');
        })
      );
  }

  createUser(user: User): Observable<User>{
    return this.http.post<ResponseCreate>(`${this.URL_BASE}api/user/register`, user, {headers: this.getHeader()})
      .pipe(
        map((response)=>{
          return response.object as User;
        }),
        catchError((e)=>{
          console.error(e);
          return throwError('Error al crear el registro!');
        })
      )
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<ResponseCreate>(`${this.URL_BASE}api/user/update/${user.id}`, user, {headers: this.getHeader()})
      .pipe(
        map((res)=>res.object as User),
        catchError((e)=>{
          console.error(e);
          return throwError('Error al crear el registro!');
        })
      );
  }
}
