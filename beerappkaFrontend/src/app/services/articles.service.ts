import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {ArticleForCreate} from '../components/article-create/ArticleForCreate';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService extends BaseService{

  constructor(private http: HttpClient) {
    super();
  }
  public getAllArticles(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/articles/`), this.httpOptions);
  }

  public getArticle(id: number): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/articles/${id}`), this.httpOptions);
  }

  public createArticle(newArticle: ArticleForCreate): Observable<ArrayBuffer> {
    return this.http.post(this.getAPIUrl(`/articles/`), newArticle, this.httpOptions);
  }
}
