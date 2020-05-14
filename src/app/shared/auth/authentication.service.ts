import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login.model';
import { environment } from 'src/environments/environment';
//import { Observable } from 'rxjs';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { staticData } from '../static';
import { error } from '@angular/compiler/src/util';
import { Token } from './token.model';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  loggedinUser: string;
  private currentUserSubject = new BehaviorSubject<any>(localStorage.getItem(staticData.LOGGED_IN_USER));
  public currentUser:Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  authenticate(request: Login): Observable<boolean> {
    return this.http.post<any>(environment.authURL + '/authenticate', request)
      .pipe(
        tap((token) => {
          this.doLoginUser(request.userName, token['jwt'])
        }),
        mapTo(true),
        catchError((err) => {
          return of(false);
        })
      );
  }

  doLoginUser(userName: string, token: string) {
    this.currentUserSubject.next(userName);
    this.storeToken(userName, token);
  }
  storeToken(userName:string, token: string) {
    //console.log('jwt:' + JSON.stringify(token))
    localStorage.setItem(staticData.LOGGED_IN_USER, userName);
    localStorage.setItem(staticData.JWT_TOKEN, token);
  }

  logout() {
    localStorage.setItem(staticData.JWT_TOKEN, '');
    localStorage.setItem(staticData.LOGGED_IN_USER, '');
    this.currentUserSubject.next('');
  }
}
