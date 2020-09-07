import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tag } from '../_models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(this.baseUrl + 'tags');
  }
}
