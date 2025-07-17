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

  actualiza_libro(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      authorization: token,
    });
    const formData  =  new FormData();
    formData.append('titulo', data.titulo);
    formData.append('contenido', data.contenido);
    formData.append('precio', data.precio);
    formData.append('stock', data.stock);
    formData.append('descripcion', data.descripcion);
    formData.append('categoria', data.categoria);
    formData.append('autor', data.autor);
    formData.append('isbn', data.isbn);
    formData.append('anio_publicacion', data.anio_publicacion);
    if(data.portada instanceof File){
      formData.append('portada', data.portada, data.portada.name);
    }else{
      formData.append('bookActualizado', data.portada);
    }    
    // const slug = data.titulo.toLowerCase().replace(/ /g, '-');
    // formData.append('slug', slug);
    
    return this.http.put(this.urlbook + 'actualiza_libro/' + id, formData, {
      headers: headers,
    });

  }  
}
