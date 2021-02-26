import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public titulo: string;
  public user: User
  public identity;
  public token;
  public alertMessage;
  public url;

  constructor(private _userService: UserService) {
    this.titulo = 'Actualizar mis datos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {

    console.log('Edicion de usuario cargada');

  }
  onSubmit() {

    this._userService.updateUser(this.user).subscribe(
      response => {
        this.user = response.user;

        if (!response.user) {
          this.alertMessage = 'No se pudo actualizar el usuario';
        } else {
          localStorage.setItem('identity', JSON.stringify(this.user));
          document.getElementById("identity_name").innerHTML = this.user.name;


          if (!this.filesToUpload) {
            //Redireccion

          } else {
            this.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload)
              .then(
                (result: any) => {
                  this.user.image=result.image;
                  localStorage.setItem('identity', JSON.stringify(this.user));

                  var image_path=this.url+'get-image-user/'+this.user.image;
                  
                  document.getElementById('image-logged').setAttribute('src',image_path);
                }
              );
          }
          this.alertMessage = 'El usuario se actualizó correctamente';
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          var parsedError = error.error.message;
          console.log(parsedError);
          this.alertMessage = parsedError;
        }
      }
    )
  }

  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }


  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    var token = this.token;

    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }

        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}
