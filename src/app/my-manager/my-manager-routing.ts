import { ClientComponent } from './components/client/home/client.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectHomeComponent } from './components/project/project-home/project-home.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth';
import { LoginComponent } from 'app/auth';
import { MyManagerComponent } from 'app/my-manager/my-manager.component';
import { ProjectDashboardComponent } from 'app/my-manager/components/project/project-detail/project-dashboard/project-dashboard.component';
import { ProjectTaskComponent } from 'app/my-manager/components/project/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from 'app/my-manager/components/project/project-detail/project-settings/project-settings.component';
import { ProjectDevisComponent } from 'app/my-manager/components/project/project-detail/project-devis/project-devis.component';
import { ProjectInvoiceComponent } from 'app/my-manager/components/project/project-detail/project-invoice/project-invoice.component';
import { ProjectDevisEditionComponent } from 'app/my-manager/components/project/project-detail/project-devis/project-devis-edition/project-devis-edition.component';
import { UserProfilComponent } from 'app/my-manager/components/common/user-profil/user-profil.component';
import { UserProfilGeneralComponent } from 'app/my-manager/components/common/user-profil/children/user-profil-general/user-profil-general.component';
import { UserProfilPasswordComponent } from 'app/my-manager/components/common/user-profil/children/user-profil-password/user-profil-password.component';

const routes: Routes = [
  {
    path: '', component: MyManagerComponent,
    children: [
      { path: '', redirectTo: '/project', pathMatch: 'full' },
      {
        path: 'profil', component: UserProfilComponent, canActivate: [AuthGuard],
        children: [
          { path: 'general', component: UserProfilGeneralComponent, canActivate: [AuthGuard] },
          { path: 'password', component: UserProfilPasswordComponent, canActivate: [AuthGuard] },
        ]
      },
      { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
      { path: 'project', component: ProjectHomeComponent, canActivate: [AuthGuard] },
      {
        path: 'project/:projectId', component: ProjectDetailComponent,
        children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          { path: 'dashboard', component: ProjectDashboardComponent },
          { path: 'tasks', component: ProjectTaskComponent },
          { path: 'devis', component: ProjectDevisComponent },
          { path: 'devis', component: ProjectDevisComponent },
          { path: 'devis/:devisId', component: ProjectDevisEditionComponent },
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
