import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Article} from '../articles-list/article';
import {ActivatedRoute, Router} from '@angular/router';
import {Permissions} from '../../permissions/permissions';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.sass']
})
export class ArticleDetailsComponent implements OnInit {
  public article: Article | undefined;

  constructor(private articleService: ArticlesService,
              private route: ActivatedRoute,
              private router: Router,
              public  permissions: Permissions) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.articleService.getArticle(id).subscribe(data => {
        this.article = data as any;
      }, err => {
        console.log(err);
        if (err.status === 404) {
          this.router.navigate(['/artykuly']);
        }
      });
    });
  }

  public deleteArticle(articleId: number): void {
    this.articleService.deleteArticle(articleId).subscribe(data => {
      this.router.navigate(['/artykuly']);
    }, err => {
      console.log(err);
    })
  }

}
