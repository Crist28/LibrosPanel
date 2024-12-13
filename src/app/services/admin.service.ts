import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BookCreate, Global, User } from '../environments/global.component';

declare let iziToast: any;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public url;
  public urlbook;
  public urluser;
  constructor(private http: HttpClient) {
    this.url = Global.url;
    this.urlbook = BookCreate.urlbook;
    this.urluser = User.urluser;
  }
  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + 'login', data, { headers });
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      return false;
    }

    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);

      if (!decodedToken || helper.isTokenExpired(token)) {
        if (typeof localStorage !== 'undefined') {
          localStorage.clear();
        }
        return false;
      }

      if (decodedToken.adminRol !== 'admin') {
        iziToast.error({
          title: 'Error',
          message: 'El usuario no es tipo administrador',
          position: 'topRight',
        });
        localStorage.clear();
        return false;
      }
    } catch (error) {
      console.log(error);
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      return false;
    }

    return true;
  }

  CreateBook(data: any, file: any, token: any): Observable<any> {
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
    formData.append('portada', file);
    const slug = data.titulo.toLowerCase().replace(/ /g, '-');
    formData.append('slug', slug);
    
    return this.http.post(this.urlbook + 'create',formData, {
      headers: headers,
    });

  }
  getBooks(id: any, token: any):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':token
    });
    return this.http.get(this.urlbook + 'api/books/'+id,{headers:headers});
  }
  cargarLibros(tipo: string, filtro: string, token: any): Observable<any> {
    let headers = new HttpHeaders({
      authorization: token,
    });
    return this.http.get(`${this.urlbook}api/books/admin/${tipo}/${filtro}`, {headers: headers});
  }
  deleteBookAdmin(id: any, token: any):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':token
    });
    return this.http.delete(this.urlbook + 'delete/'+id,{headers:headers});
  }

  registro_cliente(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':token
    });
    return this.http.post(this.urluser + 'admin_create_user', data, {
      headers: headers,
    });
  }
  //galeria imagenes
  agregarImagenesGaleria(id: any, files: File[], token: string): Observable<any> {  
    const headers = new HttpHeaders({ Authorization: token });
    const formData = new FormData();
    files.forEach((file) => formData.append('imagenes', file));
  
    return this.http.post(`${this.urlbook}/libreria/agregar-imagen/${id}`, formData, { headers });
  }
  
}
