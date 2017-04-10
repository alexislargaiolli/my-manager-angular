import { AuthGuard } from './guards/auth.guards';
import { LoginComponent } from './components/authentication/login/login.component';
import { ClientComponent } from './components/client/home/client.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectHomeComponent } from './components/project/project-home/project-home.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  
  { path: 'login', component: LoginComponent },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectHomeComponent, canActivate: [AuthGuard] },
  { path: 'project/:projectId', component: ProjectDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
