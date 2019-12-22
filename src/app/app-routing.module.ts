import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/helpers/auth.guard';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'accounts', 
    loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule), 
    canActivate: [AuthGuard] 
  }, 
  { path: 'dashboard', 
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), 
    canActivate: [AuthGuard] 
  },
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
