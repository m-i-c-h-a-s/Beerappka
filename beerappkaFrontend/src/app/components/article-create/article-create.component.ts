import { Component, OnInit } from '@angular/core';
import {ArticleForCreateUpdate} from './article-for-create-update';
import {ArticlesService} from '../../services/articles.service';
import {ArticleCreateUpdateErrors} from './article-create-update-errors';
import {Router} from '@angular/router';
import { initEditor } from '../tinymce-editor/editor';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.sass']
})
export class ArticleCreateComponent implements OnInit {
  public article: ArticleForCreateUpdate;
  public err: ArticleCreateUpdateErrors | undefined;
  public initEditor = initEditor;

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
