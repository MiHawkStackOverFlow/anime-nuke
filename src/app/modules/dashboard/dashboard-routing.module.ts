import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { TopAccountsComponent } from './components/top-accounts/top-accounts.component';

const routes: Routes = [
  { 
    path: '', component: DashboardComponent,
    children : [
      { path: '', redirectTo: 'users-list', pathMatch: 'full' },
      { path: 'users-list', component: UserListComponent },
      { path: 'recent-transactions', component: RecentTransactionsComponent },
      { path: 'top-accounts', component: TopAccountsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
