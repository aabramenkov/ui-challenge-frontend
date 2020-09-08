import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { ActivatedRoute, Data } from '@angular/router';
import { ArticleService } from 'src/app/_services/article.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MockArticleService } from 'src/app/_mock/mockArticleService';
import { MockAuthService } from 'src/app/_mock/mockAuthService';
import { Article } from 'src/app/_models/article';
import {MockModels} from 'src/app/_mock/mockModels';


describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  const article: Article = MockModels.article;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ArticleComponent],
      providers: [
        { provide: ArticleService, useClass: MockArticleService },
        { provide: AuthService, useClass: MockAuthService },
        AlertifyService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: {
              subscribe: (fn: (value: Data) => void) =>
                fn({
                  article,
                }),
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
