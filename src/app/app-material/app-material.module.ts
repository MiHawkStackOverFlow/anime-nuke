import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// imported material modules below
import {  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
          MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule,
          MatPaginatorModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule,
    MatPaginatorModule
  ]
})
export class AppMaterialModule { }
