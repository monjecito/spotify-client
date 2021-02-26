import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  public titulo:String;
  public artist:Artist[];
  public identity;
  public token;
  public url:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService
  ) { 
    this.titulo='Artistas';
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;


  }

  ngOnInit(): void {
    console.log('Lista de artistas cargada');
  }

}
