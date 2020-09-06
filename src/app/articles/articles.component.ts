import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../_models/article';
import { ArticleService } from '../_services/article.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  public articles: Article[] = [];
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.articles = data.articles.articles;
    });
  }
  createNewArticle() {}

  editArticle(slug: string) {
    
  }
  openArticle(slug: string){
    this.router.navigate(['/article/' + slug]);
  }

  deleteArticle(slug: string) {
    if (!this.authService.loggedIn()){
      this.alertify.error('Only authorized users can delete article');
      return;
    }
    this.articleService.deleteArticle(slug).subscribe(
      () => {
        for (const article of this.articles) {
          if (article.slug === slug) {
            this.articles.splice(this.articles.indexOf(article), 1);
            break;
          }
        }
        this.alertify.message('Article deleted');
      },
      (err) => {
        this.alertify.error('Error on deleting article');
      }
    );
  }
}
