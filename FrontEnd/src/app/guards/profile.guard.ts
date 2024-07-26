import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, GuardResult, MaybeAsync, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/services/loginService/login.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

    private loginService = inject(LoginService);

    canActivate( route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        const profile = route.data['profile'];
        const profileUser = this.loginService.userSession.rol;
        return (profile === profileUser);
    }
}
