import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// imported material modules below
import {  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
          MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
  ]
})
export class AppMaterialModule { }
