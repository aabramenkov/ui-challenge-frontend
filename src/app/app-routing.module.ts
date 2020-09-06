import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesResolver } from './_resolvers/articles.resolver';
import { ArticleComponent } from './article/article/article.component';
import { ArticleResolver } from './_resolvers/article.resolver';


export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
          {path: 'articles', component: ArticlesComponent, resolve: {articles: ArticlesResolver}},
          {path: 'article/:slug', component: ArticleComponent, resolve: {article: ArticleResolver}}
      ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
