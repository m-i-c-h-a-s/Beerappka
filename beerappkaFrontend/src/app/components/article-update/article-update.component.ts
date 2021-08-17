import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Article} from '../articles-list/article';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleCreateUpdateErrors} from '../article-create/article-create-update-errors';
import {ArticleForCreateUpdate} from '../article-create/article-for-create-update';
import {Permissions} from '../../permissions/permissions';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.sass']
})
export class ArticleUpdateComponent implements OnInit {
  public article: Article | undefined;
  public err: ArticleCreateUpdateErrors | undefined;
  private articleForUpdate: ArticleForCreateUpdate | undefined;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private permissions: Permissions
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.articlesService.getArticle(id).subscribe(data => {
        this.article = (data as any) as Article;
        if (!this.permissions.isArticleAuthor(this.article)) {
          this.router.navigate(['/artykuly']);
        }
      }, err => {
        console.log(err);
        if (err.status === 404) {
          this.router.navigate(['/artykuly']);
        }
      });
    });
  }

  updateArticle(): void {
    if (this.article) {
      this.err = undefined;
      this.articleForUpdate = {
        title: this.article.title,
        content: this.article.content,
        is_published: this.article.is_published
      };
      const articleId = this.article.id;
      this.articlesService.updateArticle(this.article.id, this.articleForUpdate).subscribe(data => {
        this.router.navigate([`/artykuly/${articleId}`]);
      }, err => {
        console.log(err);
        this.err = err;
      });
    }
  }

}
