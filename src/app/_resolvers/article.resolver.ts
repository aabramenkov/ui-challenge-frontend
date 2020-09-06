import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from '../_models/article';
import { ArticleService } from '../_services/article.service';

@Injectable()
export class ArticleResolver implements Resolve<Article> {

    constructor(private articleService: ArticleService, private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Article>|any {
        const slug = route.paramMap.get('slug');
        if (!slug){
            this.router.navigate(['/home']);
            return of(null);
        }
        return this.articleService.getArticle(slug).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
