import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';
import {ArtistService} from '../../services/artist.service';
import { error } from 'protractor';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers:[ArtistService,UserService]
})

export class ArtistListComponent implements OnInit {
  public titulo: String;
  public artists: Artist[];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;
 
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService:ArtistService
  ) {
    this.titulo = 'Artistas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.next_page = 1;
    this.prev_page = 1;
  }

  ngOnInit(): void {
    console.log('Lista de artistas cargada');
    this.getArtists();
  }

  getArtists() {
    this._route.params.forEach((params: Params) => {
      let page = +params['page'];

      if (!page) {
        page = 1;
      } else {
        this.next_page=page+1;
        this.prev_page=page-1;

        if(this.prev_page==0){
          this.prev_page=1;
        }
      }

      this._artistService.getArtists(this.token,page).subscribe(
        response=>{
          if(!response.artists){
            this._router.navigate(['/']);
          }else{
            this.artists=response.artists;
          }
        },
        error=>{
          var parsedError = error.error.message;
          console.log(parsedError);
         
          // this.errorMessage = parsedError;
        }
      )
    })
  }
  public confirmado;
  onDeleteConfirm(id){
    this.confirmado=id;
    console.log(this.confirmado);
  }

  onCancelArtist(){
    this.confirmado=null;
  }

  onDeleteArtist(id){
    this._artistService.deleteArtist(id,this.token).subscribe(
      response=>{
        if(!response.artist){
          alert('Error en el servidor');
        }
        this.getArtists();
      },
      error=>{
        var parsedError = error.error.message;
        console.log(parsedError);
       
      }
    )
  }
}
