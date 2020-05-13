import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        debugger
        const token = localStorage.getItem('JWT_TOKEN')

        if(token != '' && token != null){
            request = request.clone({
                setHeaders:{
                    Authorization: 'Bearer '+token
                }
            })
        }

        return next.handle(request)
    }

}