import { Component, OnInit } from '@angular/core';
import {ArticleForCreate} from './ArticleForCreate';
import {ArticlesService} from '../../services/articles.service';
import {ArticleCreateErrors} from './ArticleCreateErrors';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.sass']
})
export class ArticleCreateComponent implements OnInit {
  public article: ArticleForCreate;
  public err: ArticleCreateErrors | undefined;

  constructor(
    private articleService: ArticlesService,
    private router: Router
  ) {
    this.article = {
      title: '',
      content: '',
      is_published: false
    };
  }

  ngOnInit(): void {
  }

  public createArticle(): void {
    this.err = undefined;
    this.articleService.createArticle(this.article).subscribe(data => {
      this.router.navigate(['/artykuly']);
    }, err => {
      console.log(err);
      this.err = err.error;
    });
  }

}
