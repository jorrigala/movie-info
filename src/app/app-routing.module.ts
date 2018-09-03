import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieSearchComponent } from './movie-search/movie-search.component';
import { KeyApiComponent } from './key-api/key-api.component';

const routes: Routes = [
  { path: '', redirectTo: '/keyapi', pathMatch: 'full'},
  { path: 'keyapi', component: KeyApiComponent },
  { path: 'search', component: MovieSearchComponent },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
      RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
