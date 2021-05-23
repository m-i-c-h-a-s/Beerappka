import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }
  public login(user: any): Observable<ArrayBuffer> {
    return this.http.post(this.getAPIUrl('/auth/login/'), JSON.stringify(user), this.httpOptions);
  }
  public logout(): Observable<ArrayBuffer> {
    localStorage.removeItem('auth_token');
    return this.http.post(this.getAPIUrl('/auth/logout/'), null, this.httpOptions);
  }
  public register(user: any): Observable<ArrayBuffer> {
    return this.http.post(this.getAPIUrl('/auth/registration/'), JSON.stringify(user), this.httpOptions);
  }
  public isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
}
