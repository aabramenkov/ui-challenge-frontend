import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../_models/article';
import { ArticleService } from 'src/app/_services/article.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  public article!: Article;
  @ViewChild('newComment') newCommment: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      if (data.article.article) {
        this.article = data.article.article;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  submitNewComment(commentBody: string) {
    if (!this.authService.loggedIn()){
      this.alertify.error('Only registered users can leave comment');
      return;
    }
    if (commentBody && this.article.slug) {
      this.articleService
        .createComment(commentBody, this.article.slug)
        .subscribe(
          (resp: any) => {
            this.newCommment.nativeElement.value = null;
            this.alertify.message('Comment published');
            this.article.comments = resp.article.comments;
          },
          (err) => {
            this.alertify.error('Error! Comment not published');
          }
        );
    }
  }
  deleteComment(id: number) {
    if (!this.article.slug) {
      return;
    }
    if (!this.authService.loggedIn()){
      this.alertify.error('Only registered users can delete comment');
      return;
    }

    this.articleService.deleteComment(id, this.article.slug).subscribe(
      () => {
        for (const comment of this.article.comments) {
          if (comment.id === id) {
            this.article.comments.splice(
              this.article.comments.indexOf(comment),
              1
            );
            break;
          }
        }
        this.alertify.message('Comment deleted');
      },
      () => {
        this.alertify.error('Error on deleting comment!');
      }
    );
  }
}
