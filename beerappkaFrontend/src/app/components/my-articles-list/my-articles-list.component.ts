import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from '../articles-list/article';

@Component({
  selector: 'app-my-articles-list',
  templateUrl: './my-articles-list.component.html',
  styleUrls: ['./my-articles-list.component.sass']
})
export class MyArticlesListComponent implements OnInit {
  public articles: Array<Article> = [];

  totalLength: any;
  page: number = 1;

  constructor(
    private articlesService: ArticlesService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getArticles(1);
  }

  getArticles(pageNumber: number) {
    this.articlesService.getUserArticles(this.page).subscribe(data => {
      this.articles = (data as any).results;
      this.totalLength = (data as any).count;
    }, err => {
      console.log(err);
    });
  }

  onPageChange(event: number): void {
    this.page = event;
    this.getArticles(this.page);
  }
}
