import { ProjectHomeComponent } from './components/project-home/project-home.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/modules/auth';
import { LoginComponent } from 'app/modules/auth';
import { ProjectDashboardComponent } from './components/project-detail/project-dashboard/project-dashboard.component';
import { ProjectTaskComponent } from './components/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from './components/project-detail/project-settings/project-settings.component';
import { ProjectDevisComponent } from './components/project-detail/project-devis/project-devis.component';
import { ProjectInvoiceComponent } from './components/project-detail/project-invoice/project-invoice.component';
import { ProjectDevisEditionComponent } from './components/project-detail/project-devis/project-devis-edition/project-devis-edition.component';
import { ProjectInvoiceEditionComponent } from './components/project-detail/project-invoice/project-invoice-edition/project-invoice-edition.component';

const routes: Routes = [
  { path: 'project', component: ProjectHomeComponent, canActivate: [AuthGuard] },
  {
    path: 'project/:projectId', component: ProjectDetailComponent,
    children: [
      { path: 'dashboard', component: ProjectDashboardComponent },
      { path: 'tasks', component: ProjectTaskComponent },
      { path: 'devis', component: ProjectDevisComponent },
      { path: 'devis', component: ProjectDevisComponent },
      { path: 'devis/:devisId', component: ProjectDevisEditionComponent },
      { path: 'invoices', component: ProjectInvoiceComponent },
      { path: 'invoices/:invoiceId', component: ProjectInvoiceEditionComponent },
      { path: 'settings', component: ProjectSettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyManagerRoutingModule { }
