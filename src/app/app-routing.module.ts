import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './modules/auth';
import { PageNotFoundComponent } from "app/modules/core";
import { ProjectHomeComponent } from './modules/project/components/project-home/project-home.component';
import { AuthGuard } from 'app/modules/auth';

const routes: Routes = [
  { path: 'login', component: LoginRegisterComponent },
  // { path: 'project', component: ProjectHomeComponent, canActivate: [AuthGuard], data: { animation: 'projectHome' } },
  // { path: 'client', loadChildren: './modules/client/client.module#ClientModule' },
  { path: 'profile', loadChildren: './modules/user-profile/user-profile.module#UserProfileModule' },
  {
    path: '',
    redirectTo: '/project',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
