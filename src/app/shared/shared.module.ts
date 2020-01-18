import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [ NotFoundComponent ],
  imports: [ CommonModule, Ng4LoadingSpinnerModule.forRoot() ],
  exports: [ NotFoundComponent, Ng4LoadingSpinnerModule ]
})
export class SharedModule { }
