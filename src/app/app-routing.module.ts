import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/project', pathMatch: 'full' },
  { path: 'client', loadChildren: './modules/client/client.module#ClientModule' },
  { path: 'profile', loadChildren: './modules/user-profile/user-profile.module#UserProfileModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
