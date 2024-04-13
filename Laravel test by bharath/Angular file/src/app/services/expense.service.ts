import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(private http: HttpClient, public api: RestApiService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  public getExpenses(pageNumber: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.url + 'show-expense?page=' + pageNumber, {
          headers: this.getHeaders(),
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            this.handleApiError(error);
            reject(error);
          }
        );
    });
  }

  public getIncomes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.url + 'show-income', {
          headers: this.getHeaders(),
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            this.handleApiError(error);
            reject(error);
          }
        );
    });
  }


  public getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.url + 'categories', {
          headers: this.getHeaders(),
        })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            this.handleApiError(error);
            reject(error);
          }
        );
    });
  }

  public handleApiError(error: HttpErrorResponse) {
    if (error.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
}
