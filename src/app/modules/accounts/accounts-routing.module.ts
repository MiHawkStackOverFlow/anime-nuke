import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent } from './components/accounts.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

const routes: Routes = [
  { path: '', component: AccountsComponent },
  { path: 'details', component: AccountDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
