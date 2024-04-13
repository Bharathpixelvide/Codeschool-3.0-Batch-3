import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = [];

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(
    public http: HttpClient,
    public route: Router,
    public api: RestApiService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  public getUserDetails() {
    return this.http.get<any>(environment.url + 'user-details', {
      headers: this.getHeaders(),
    });
  }

  getMenus(): Observable<any> {
    return this.http.get<any>(environment.url + 'get-menus', {
      headers: this.getHeaders(),
    });
  }

}
