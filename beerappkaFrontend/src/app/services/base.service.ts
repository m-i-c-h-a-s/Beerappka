import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected readonly httpOptions: any;
  private BASE_API_URL = 'http://localhost:8000/api/v1';

  constructor() {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'json' as const
    };
  }
  getAPIUrl(url: string): string {
    return `${this.BASE_API_URL}${url}`;
  }
}
