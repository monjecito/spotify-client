import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';
import { ArtistService } from '../../services/artist.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: '../artist-add/artist-add.component.html',
  styleUrls: ['./artist-edit.component.css'],
  providers: [UserService, ArtistService,UploadService]
})

export class ArtistEditComponent implements OnInit {

  public titulo: String;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _uploadService:UploadService  
  ) {
    this.titulo = 'Editar un artista';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('', '', '');
    this.is_edit = true;

  }
  ngOnInit(): void {
   
    this._route.params.subscribe(params => {
      let id = params['id'];

console.log(id);
    });
  }
  getArtist() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      console.log(id);
      this._artistService.getArtist(this.token, id).subscribe(
        response => {
      
          if(!response.artist){
            this._router.navigate(['/']);

          }else{
            this.artist=response.artist;
          
          }
        },
        error => {
          var errorMessage = <any>error;


          if (errorMessage != null) {
            var parsedError = error.error.message;
            console.log(parsedError);
            //this.alertMessage = parsedError;
            // this.errorMessage = parsedError;
          }
        }
      );
    });
  }
  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._artistService.editArtist(this.token, id, this.artist).subscribe(
        response => {
          console.log(response.artist);
          if (!response.artist) {
            this.alertMessage = 'Error en el servidor';
          } else {
            //this.artist = response.artist;
            this.alertMessage = 'Artista actualizado correctamente';
            //Subir la imagen del artista

            this._uploadService.makeFileRequest(this.url+'upload-image-artist/'+id, [], this.filesToUpload,this.token,'image')

            .then(
              (result)=>{
                alert('Artista editado');
              },
              (error)=>{
                console.log(error);
              }
            );
            //this._router.navigate(['/editar-artista',response.artist._id]);
          }
        },
        error => {
          var errorMessage = <any>error;


          if (errorMessage != null) {
            var parsedError = error.error.message;
            console.log(parsedError);
            this.alertMessage = parsedError;
            // this.errorMessage = parsedError;
          }
        }
      )
    });
  }

  public filesToUpload:Array<File>;

  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;

    
  }

}
