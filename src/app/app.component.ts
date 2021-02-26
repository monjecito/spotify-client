import { Component } from '@angular/core';

import {Router,ActivatedRoute,Params} from '@angular/router';

import { User } from './models/user';
import { UserService } from './services/user.service';
import {GLOBAL} from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent {
  public title = 'MUSIFY';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url:string;
  constructor(
    private _userService: UserService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url=GLOBAL.url;
  }

  ngOnInit() {
 
    console.log(this.identity);
    console.log(this.token);

  }

  public onSubmit() {
    console.log(this.user);

    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if (!this.identity._id) {
          alert('El usuario no esta identificado');
        } else {
          //Almacenar en localStorage
          localStorage.setItem('identity', JSON.stringify(identity));


          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if (this.token.length <= 0) {
                alert('El token no se ha generado correctamente');
              } else {
                //Almacenar en localStorage
                localStorage.setItem('token', token);

                this.user = new User('', '', '', '', '', 'ROLE_USER', '');
              }
            },
            error => {
              var errorMessage = <any>error;
              console.log(errorMessage);
              if (errorMessage != null) {
                var parsedError = error.error.message;
                console.log(parsedError);
                this.errorMessage = parsedError;
              }
            }
          );
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          var parsedError = error.error.message;
          console.log(parsedError);
          this.errorMessage = parsedError;
        }
      }
    );
  }
  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;

    this._router.navigate(['/home']);
  }

 

  onSubmitRegister() {
    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;

        if (!user._id) {
         this.alertRegister='Error al registrarse';
        } else {
          this.alertRegister='El registro se ha realizado correctamente,identificate con '+this.user_register.email;
          this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
        }
      },
      error => {
        var errorMessage = <any>error;


        if (errorMessage != null) {
          var parsedError = error.error.message;
          console.log(parsedError);
          this.alertRegister = parsedError;
          // this.errorMessage = parsedError;
        }
      }
    );
  }
}
