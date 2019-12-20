import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { DashboardComponent } from './dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { GamesListComponent } from './components/games-list/games-list.component';

@NgModule({
  declarations: [DashboardComponent, UserListComponent, GamesListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppMaterialModule
  ]
})
export class DashboardModule { }
