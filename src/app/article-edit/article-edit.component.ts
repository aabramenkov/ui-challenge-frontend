import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Article } from '../_models/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../_services/article.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  public article!: Article;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertify: AlertifyService
  ) {}

  articleForm = this.formBuilder.group({
    title: [this.article?.title, Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required],
    tagList: [''],
  });

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.article = data.article.article;
      this.setFormValue();
    });
  }

  UpdateArticle() {
    const articleFromForm: Article = this.articleForm.value;
    articleFromForm.tagList = this.articleForm.value.tagList.split(',');
    const newArticle: Article = {...this.article, ...articleFromForm};
    if (newArticle.id) {
      this.articleService.updateArticle(newArticle).subscribe(
        (articleFromServer: Article) => {
          this.article = articleFromServer;
          this.alertify.message('Article updated');
        },
        () => {
          this.alertify.error('Error on updating Article');
        }
      );
    } else{
      this.articleService.createArticle(newArticle).subscribe(
        (articleFromServer: Article) => {
          this.article = articleFromServer;
          this.alertify.message('Article created');
        },
        () => {
          this.alertify.error('Error on creating Article');
        }
      );
    }
  }

  private setFormValue() {
    this.articleForm.patchValue({
      title: this.article.title,
      description: this.article.description,
      body: this.article.body,
      tagList: this.article.tagList.toString(),
    });
  }
}
