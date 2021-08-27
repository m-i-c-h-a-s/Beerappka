import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {ChangePassword} from '../components/profile/change-password/change-password';

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
  public getAllUsers(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/users/`), this.httpOptions);
  }
  public getUserData(username: string): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/users/${username}/`), this.httpOptions);
  }
  public getCurrentUserData(): Observable<ArrayBuffer> {
    const username = JSON.parse(localStorage.getItem('current_user') as string).username;
    return this.http.get(this.getAPIUrl(`/users/${username}/`), this.httpOptions);
  }
  public updateUser(userData: any): Observable<ArrayBuffer> {
    const {username} = userData;
    return this.http.put(this.getAPIUrl(`/users/${username}/`), userData, this.httpOptions);
  }
  public updateProfilePicture(data: FormData): Observable<any> {
    return this.http.post(this.getAPIUrl(`/users/update_profile_picture/`), data);
  }
  public changeUserPassword(data: ChangePassword): Observable<any> {
    return this.http.post(this.getAPIUrl(`/auth/password/change/`), data);
  }
  public deleteUserAccount(): Observable<any> {
    const username = JSON.parse(localStorage.getItem('current_user') as string).username;
    return this.http.delete(this.getAPIUrl(`/users/${username}/`));
  }
}
