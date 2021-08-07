import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Article} from '../articles-list/article';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.sass']
})
export class ArticleDetailsComponent implements OnInit {
  public article: Article | undefined;

  constructor(private articleService: ArticlesService,
              private route: ActivatedRoute,
              private router: Router) { }

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

}
