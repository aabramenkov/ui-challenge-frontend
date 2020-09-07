import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertifyService } from './_services/alertify.service';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesResolver } from './_resolvers/articles.resolver';
import { JwtModule } from '@auth0/angular-jwt';
import { ArticleComponent } from './article/article/article.component';
import { ArticleResolver } from './_resolvers/article.resolver';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './home/register/register.component';
import { CommentComponent } from './article/comment/comment.component';
import { AuthorizedDirective } from './_directives/authorized.directive';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { TagsComponent } from './tags/tags.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ArticlesComponent,
    ArticleComponent,
    CommentComponent,
    AuthorizedDirective,
    ArticleEditComponent,
    ProfileComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:5000/api/users/login']
      }
    }),

    BsDropdownModule.forRoot(),
  ],
  providers: [AlertifyService, ArticlesResolver, ArticleResolver, UserEditResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
