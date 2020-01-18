import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './components/accounts.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';


@NgModule({
  declarations: [AccountsComponent, AccountDetailsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
