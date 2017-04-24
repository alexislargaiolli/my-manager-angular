import { ClientComponent } from './components/client/home/client.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectHomeComponent } from './components/project/project-home/project-home.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/authentication/guards/auth.guards';
import { LoginComponent } from 'app/authentication/components/login/login.component';
import { MyManagerComponent } from 'app/my-manager/my-manager.component';
import { ProjectDashboardComponent } from 'app/my-manager/components/project/project-detail/project-dashboard/project-dashboard.component';
import { ProjectTaskComponent } from 'app/my-manager/components/project/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from 'app/my-manager/components/project/project-detail/project-settings/project-settings.component';
import { ProjectDevisComponent } from 'app/my-manager/components/project/project-detail/project-devis/project-devis.component';
import { ProjectInvoiceComponent } from 'app/my-manager/components/project/project-detail/project-invoice/project-invoice.component';

const routes: Routes = [
  {
    path: '', component: MyManagerComponent,
    children: [
      { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
      { path: 'project', component: ProjectHomeComponent, canActivate: [AuthGuard] },
      {
        path: 'project/:projectId', component: ProjectDetailComponent,
        children: [
          { path: 'dashboard', component: ProjectDashboardComponent },
          { path: 'tasks', component: ProjectTaskComponent },
          { path: 'devis', component: ProjectDevisComponent },
          { path: 'invoices', component: ProjectInvoiceComponent },
          { path: 'settings', component: ProjectSettingsComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyManagerRoutingModule { }
