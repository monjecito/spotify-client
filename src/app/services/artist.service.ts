import { Injectable } from '@angular/core'; //Exportar servicios
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';

import { GLOBAL } from './global';

@Injectable()
export class ArtistService {
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;

    }
    getArtists(token, page) : Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-type', 'application-json')
            .set('Authorization', token);

        return this._http.get(this.url + 'artists/' + page, { headers: headers });
    }

    getArtist(token, id:string) : Observable<any> {
        let headers = new HttpHeaders()
            .set('Content-type', 'application-json')
            .set('Authorization', token);

        return this._http.get(this.url + 'artist/' + id, { headers: headers });
    }

    editArtist(token, id, artist: Artist): Observable<any> {
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.put(this.url + 'artist/' + id, params, { headers: headers });

    }

    addArtist(token, artist: Artist): Observable<any> {

        let params = JSON.stringify(artist);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.post(this.url + 'artist', params, { headers: headers });
    }

    deleteArtist(id: string, token) : Observable<any>{
        let headers = new HttpHeaders()
            .set('Content-type', 'application-json')
            .set('Authorization', token);

        return this._http.delete(this.url + 'artist/' + id, { headers: headers });
    }

}