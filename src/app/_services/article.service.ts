import { Injectable } from '@angular/core';
import { Article } from '../_models/article';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.baseUrl + 'articles');
  }

  public getArticle(slug: string): Observable<Article> {
    return this.http.get<Article>(this.baseUrl + 'articles/' + slug);
  }

  public createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.baseUrl + 'articles', article);
  }

  public updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(this.baseUrl + 'articles/' + article.slug, article);
  }

  public deleteArticle(slug: string) {
    return this.http.delete(this.baseUrl + 'articles/' + slug);
  }

  public addArticleToFavorite() {}
  public deleteArticleFromFavirite() {}

  public createComment(body: string, articleSlug: string): Observable<Article> {
    return this.http.post<Article>(
      this.baseUrl + 'articles/' + articleSlug + '/comments',
      { body }
    );
  }

  public deleteComment(id: number, articleSlug: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'articles/' + articleSlug + '/comments/' + id);
  }
}
