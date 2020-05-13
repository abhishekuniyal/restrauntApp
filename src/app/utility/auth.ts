import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AuthenticationService } from '../shared/auth/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Auth implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const loggedinUser = this.authService.loggedinUser;
        if(loggedinUser){
            return true
        }
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        
        return false;
    }
}