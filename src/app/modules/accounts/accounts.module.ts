import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './components/accounts.component';


@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
