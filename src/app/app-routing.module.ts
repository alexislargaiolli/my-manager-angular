import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth';
import { PageNotFoundComponent } from "app/modules/core";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'project', loadChildren: './modules/project/project.module#ProjectModule' },
  // { path: 'client', loadChildren: './modules/client/client.module#ClientModule' },
  // { path: 'profile', loadChildren: './modules/user-profile/user-profile.module#UserProfileModule' },
  // {
  //   path: '',
  //   redirectTo: '/project',
  //   pathMatch: 'full'
  // },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
