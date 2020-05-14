import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/shared/auth/login.model';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formdata:Login;
  jwtToken:string;
  isLoggedin: boolean;

  constructor(private router:Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.formdata = {
      userName : '',
      userPass: ''
    }
  }

  submit(form: NgForm){
    if(form.valid){
        this.authService.authenticate(this.formdata)
                          .pipe(first())
                          .subscribe(res =>{
                            this.isLoggedin = res;
                            debugger
                            console.log('ress:'+res)
                            this.router.navigate(['order']);
                            },
                            error => {
                              debugger
                              console.log('error::'+error)    
                            });
                        
    }
  }
}
