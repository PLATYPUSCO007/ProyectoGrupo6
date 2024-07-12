import { Injectable, inject } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../login/services/loginService/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    canActivate(): Observable<boolean> {
        return this.checkIsLoguin();
    }

    canLoad(): Observable<boolean> {
        return this.checkIsLoguin();
    }

    private loginService = inject(LoginService);
    private router = inject(Router);


    checkIsLoguin(): Observable<boolean>{
        return this.loginService.isLogued()
            .pipe(
                tap(result=>{
                    if (!result) this.router.navigateByUrl('/sesion');
                })
            )
    }

}
