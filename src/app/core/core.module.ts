import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from './../modules/app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './components/login/login.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';

@NgModule({
  declarations: [ LoginComponent, TopNavComponent ],
  imports: [ CommonModule, AppMaterialModule, FlexLayoutModule ],
  exports: [ LoginComponent, TopNavComponent, AppMaterialModule, FlexLayoutModule ]
})
export class CoreModule { }
