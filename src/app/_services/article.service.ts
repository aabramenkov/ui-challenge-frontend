import { Injectable } from '@angular/core';
import { Article } from '../_models/article';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.baseUrl + 'articles');
  }
}
