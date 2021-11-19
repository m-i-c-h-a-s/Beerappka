import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import {ArticlesService} from '../../services/articles.service';
import {Article} from './article';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.sass']
})
export class ArticlesListComponent implements OnInit {
  public articles: Array<Article> = [];

  totalLength: any;
  page: number = 1;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getAllArticles().subscribe(data => {
      this.articles = (data as any).results;
      this.totalLength = (data as any).results.length;
    }, err => {
      console.log(err);
    });
  }

}
