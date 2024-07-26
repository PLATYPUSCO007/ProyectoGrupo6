import { Injectable, inject } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { LoginData, LoginResponse } from '../../interfaces/log.interface';
import { User } from '../../../interfaces/Roles.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL_BASE = environments.url_api;
  private http = inject(HttpClient);
  private userLogued?: User;

  constructor() { }

  isLogued(): Observable<boolean>{
    return of(!!localStorage.getItem('session'));
  }

  get userSession(): User{
    if(!this.userLogued && this.isLogued()){
      this.userLogued = JSON.parse(localStorage.getItem('session')!).user;
    }
    return this.userLogued!;
  }

  get userToken(): string {
    return (localStorage.getItem('session')) ? JSON.parse(localStorage.getItem('session')!).token : '';
  }

  getHeader(): HttpHeaders{
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return headers;
  }

  logUser(credentials: LoginData): Observable<User>{
    return this.http.post<LoginResponse>(`${this.URL_BASE}api/user/login`, credentials)
      .pipe(
        tap((response)=>{
          this.storeSession(JSON.stringify({token: response.token, user: response.user}));
        }),
        tap((response)=>this.userLogued = response.user),
        map((response)=>{
          return response.user;
        }),
        catchError(e=>{
          console.error(e);
          return throwError('Error al loguearse!');
        }),
      )
  }

  logOut(): Observable<boolean>{
    localStorage.clear();
    return of(true);
  }

  storeSession(session: string){
    localStorage.setItem('session', session);
  }
}
