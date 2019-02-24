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
    path: 'stream',
    loadChildren: './stream/stream.module#StreamPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
