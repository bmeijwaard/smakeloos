import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'thuis',
    pathMatch: 'full'
  },
  {
    path: 'thuis',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'cards',
    loadChildren: './cards/cards.module#CardsPageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
