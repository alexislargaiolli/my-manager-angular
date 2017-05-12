import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/authentication/guards/auth.guards';
import { LoginComponent } from 'app/authentication/components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/project', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
