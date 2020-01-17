import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { GamesListComponent } from './components/games-list/games-list.component';

const routes: Routes = [
  { 
    path: '', component: DashboardComponent,
    children : [
      { path: '', redirectTo: 'users-list', pathMatch: 'full' },
      { path: 'users-list', component: UserListComponent },
      { path: 'games-list', component: GamesListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
