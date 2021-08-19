import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Article} from './article';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.sass']
})
export class ArticlesListComponent implements OnInit {
  public articles: Array<Article> = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getAllArticles().subscribe(data => {
      this.articles = (data as any).results;
    }, err => {
      console.log(err);
    });
  }

}
