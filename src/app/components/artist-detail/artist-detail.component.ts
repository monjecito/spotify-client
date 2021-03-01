
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';
import { ArtistService } from 'src/app/services/artist.service';


@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
  providers:[ArtistService,UserService]
})
export class ArtistDetailComponent implements OnInit {

  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
  ) { 


    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

  }

  ngOnInit(): void {
    this.getArtist();
  }
  
  getArtist() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._artistService.getArtist(this.token, id).subscribe(
        response => {
      
          if(!response.artist){
            this._router.navigate(['/']);

          }else{
            this.artist=response.artist;
            
            //Albums del artista
            
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
}
