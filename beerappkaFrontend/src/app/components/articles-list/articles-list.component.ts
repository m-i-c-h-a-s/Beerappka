import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { ArticlesService } from '../../services/articles.service';
import { Article } from './article';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.sass']
})
export class ArticlesListComponent implements OnInit {
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
    this.articlesService.getAllPublicArticles(this.page).subscribe(data => {
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
