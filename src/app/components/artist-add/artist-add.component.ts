import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  providers:[UserService,ArtistService]
})
export class ArtistAddComponent implements OnInit {
  public titulo:String;
  public artist:Artist;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _artistService:ArtistService
  ) { 
    this.titulo='Crear un nuevo artista';
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.artist=new Artist('','','');
    this.is_edit=true;

  }
  ngOnInit(): void {
    console.log('Componente de creacion de artista cargando');
  }
  onSubmit(){
    this._artistService.addArtist(this.token,this.artist).subscribe(
      response=>{    
          if(!response.artist){
            this.alertMessage='Error en el servidor';
          }else{
            this.artist=response.artist;
            this.alertMessage='Artista creado correctamente';
            //this._router.navigate(['/editar-artista',response.artist._id]);
          }
      },
      error=>{
        var errorMessage = <any>error;


        if (errorMessage != null) {
          var parsedError = error.error.message;
          console.log(parsedError);
          this.alertMessage = parsedError;
          // this.errorMessage = parsedError;
        }
      }
    )
  }

}
