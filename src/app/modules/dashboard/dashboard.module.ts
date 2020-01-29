import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { DashboardComponent } from './dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { TopAccountsComponent } from './components/top-accounts/top-accounts.component';

@NgModule({
  declarations: [DashboardComponent, UserListComponent, RecentTransactionsComponent, TopAccountsComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
