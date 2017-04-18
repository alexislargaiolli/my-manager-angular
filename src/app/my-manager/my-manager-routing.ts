import { ClientComponent } from './components/client/home/client.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectHomeComponent } from './components/project/project-home/project-home.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/authentication/guards/auth.guards';
import { LoginComponent } from 'app/authentication/components/login/login.component';
import { MyManagerComponent } from 'app/my-manager/my-manager.component';

const routes: Routes = [
  {
    path: '', component: MyManagerComponent,
    children: [
      { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
      { path: 'project', component: ProjectHomeComponent, canActivate: [AuthGuard] },
      { path: 'project/:projectId', component: ProjectDetailComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyManagerRoutingModule { }
