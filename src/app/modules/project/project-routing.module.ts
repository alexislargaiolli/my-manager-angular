import { AuthGuard } from './../auth/guards/auth.guards';
import { CreateProjectComponent } from './components/common/create-project/create-project.component';
import { ProjectHomeComponent } from './components/project-home/project-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/modules/auth';
import { ProjectDashboardComponent } from './components/project-detail/project-dashboard/project-dashboard.component';
import { ProjectTaskComponent } from './components/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from './components/project-detail/project-settings/project-settings.component';
import { ProjectDevisComponent } from './components/project-detail/project-devis/project-devis.component';
import { ProjectInvoiceComponent } from './components/project-detail/project-invoice/project-invoice.component';
import { ProjectDevisEditionComponent } from './components/project-detail/project-devis/project-devis-edition/project-devis-edition.component';
import { ProjectInvoiceEditionComponent } from './components/project-detail/project-invoice/project-invoice-edition/project-invoice-edition.component';
import { ProjectDetailResolver } from './services/project-resolver';
import { DevisGuard } from 'app/modules/project/components/guards/devis.guard';

const routes: Routes = [
    { path: 'project', component: ProjectHomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: { animation: 'projectHome' } },
    { path: 'createProject', component: CreateProjectComponent, canActivate: [AuthGuard], data: { animation: 'createProject' } },
    {
        path: 'project/:projectId', resolve: { project: ProjectDetailResolver }, canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: ProjectDashboardComponent, data: { animation: 'projectDashboard' } },
            { path: 'tasks', component: ProjectTaskComponent, data: { animation: 'projectTasks' } },
            { path: 'devis', component: ProjectDevisComponent, data: { animation: 'projectDevis' } },
            { path: 'devis/:devisId', component: ProjectDevisEditionComponent, data: { animation: 'projectDevisSelected' } },
            { path: 'invoices', component: ProjectInvoiceComponent, data: { animation: 'projectInvoices' } },
            { path: 'invoices/:invoiceId', component: ProjectInvoiceEditionComponent, data: { animation: 'projectInvoiceSelected' } },
            { path: 'settings', component: ProjectSettingsComponent, data: { animation: 'projectSettings' } },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyManagerRoutingModule { }
