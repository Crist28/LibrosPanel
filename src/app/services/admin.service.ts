import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { HttpHeaders, HttpClient } from '@angular/common/http'; 
import { Global } from '../environments/global.component';

declare let iziToast: any;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url; 
  constructor(private http: HttpClient) {
    this.url = Global.url;
  }
  login_admin(data: any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.http.post(this.url+'login', data,{headers})
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
  
      if (decodedToken.rol !== 'admin') {
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
}
