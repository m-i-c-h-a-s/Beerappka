import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BeerStylesService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }
  public getAllBeerStyles(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/beer-styles/`), this.httpOptions);
  }
}
