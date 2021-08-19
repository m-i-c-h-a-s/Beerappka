import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {ArticleForCreateUpdate} from '../components/article-create/article-for-create-update';

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

  public createArticle(newArticle: ArticleForCreateUpdate): Observable<ArrayBuffer> {
    return this.http.post(this.getAPIUrl(`/articles/`), newArticle, this.httpOptions);
  }

  public updateArticle(id: number, article: ArticleForCreateUpdate): Observable<ArrayBuffer> {
    return this.http.put(this.getAPIUrl(`/articles/${id}/`), article, this.httpOptions);
  }

  public deleteArticle(articleId: number): Observable<ArrayBuffer> {
    return this.http.delete(this.getAPIUrl(`/articles/${articleId}/`), this.httpOptions);
  }
}
