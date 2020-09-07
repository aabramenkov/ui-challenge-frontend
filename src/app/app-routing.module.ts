import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesResolver } from './_resolvers/articles.resolver';
import { ArticleComponent } from './article/article/article.component';
import { ArticleResolver } from './_resolvers/article.resolver';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { TagsComponent } from './tags/tags.component';


export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
      path: '',
      runGuardsAndResolvers: 'always',
      children: [
          {path: 'articles', component: ArticlesComponent, resolve: {articles: ArticlesResolver}},
          {path: 'article/:slug', component: ArticleComponent, resolve: {article: ArticleResolver}},
          {path: 'article/edit/:slug', canActivate: [AuthGuard], component: ArticleEditComponent, resolve: {article: ArticleResolver}},
          {path: 'profile/edit', canActivate: [AuthGuard], component: ProfileComponent,
          resolve: {user: UserEditResolver}},
          {path: 'tags', component: TagsComponent},

      ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
