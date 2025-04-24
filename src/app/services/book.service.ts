import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BookCreate, Global, User } from '../environments/global.component';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public url;
  public urlbook;
  public urluser;
  constructor(private http: HttpClient) {
    this.url = Global.url;
    this.urlbook = BookCreate.urlbook;
    this.urluser = User.urluser;
  }
  obtener_libro(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      authorization: token,
    });
    return this.http.get(`${this.urlbook}obtener_libro/${id}`, {headers});
  }  
}
