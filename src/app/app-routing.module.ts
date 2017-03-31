import { ClientComponent } from './components/client/home/client.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectHomeComponent } from './components/project/project-home/project-home.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  
  { path: 'client', component: ClientComponent },
  { path: 'project', component: ProjectHomeComponent },
  { path: 'project/:projectId', component: ProjectDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
