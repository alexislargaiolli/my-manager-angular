import { NgModule } from '@angular/core';
import { MyDatePickerModule } from 'mydatepicker';
import { DatepickerModule } from 'angular2-material-datepicker';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from 'app/modules/shared/shared.module';
import { MyManagerRoutingModule } from './project-routing';
import { ClientService } from './services/client.service';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { GainService } from './services/gain.service';
import { NoteService } from './services/note.service';
import { NavigationService } from './services/navigation.service';
import { HistoryEntryService } from './services/history.service';
import { DevisService } from './services/devis.service';
import { ProjectHomeComponent } from './components/project/project-home/project-home.component';
import { ProjectListComponent } from './components/project/common/project-list/project-list.component';
import { ProjectCreateComponent } from './components/project/common/project-create/project-create.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { ProjectTaskComponent } from './components/project/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from './components/project/project-detail/project-settings/project-settings.component';
import { NoteListComponent } from './components/project/common/note-list/note-list.component';
import { ProjectGainsComponent } from './components/project/common/project-gains/project-gains.component';
import { ProjectClientComponent } from './components/project/common/project-client/project-client.component';
import { GainListComponent } from './components/project/common/gain-list/gain-list.component';
import { ProjectHistoryComponent } from './components/project/common/project-history/project-history.component';
import { ProjectDashboardComponent } from './components/project/project-detail/project-dashboard/project-dashboard.component';
import { ProjectInvoiceComponent } from './components/project/project-detail/project-invoice/project-invoice.component';
import { ProjectDevisComponent } from './components/project/project-detail/project-devis/project-devis.component';
import { ProjectDevisEditionComponent } from './components/project/project-detail/project-devis/project-devis-edition/project-devis-edition.component';
import { DevisStatePipe } from './services/devisState.pipe';
import { DevisPreviewComponent } from './components/project/common/devis-preview/devis-preview.component';
import { OneValueCardComponent } from './components/project/common/one-value-card/one-value-card.component';

@NgModule({
  imports: [
    SharedModule,
    MyManagerRoutingModule,
    DragulaModule,
    MyDatePickerModule,
    DatepickerModule
  ],
  declarations: [
    ProjectHomeComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectDetailComponent,
    ProjectTaskComponent,
    ProjectSettingsComponent,
    ProjectGainsComponent,
    NoteListComponent,
    GainListComponent,
    ProjectClientComponent,
    ProjectHistoryComponent,
    ProjectDashboardComponent,
    ProjectDevisComponent,
    ProjectInvoiceComponent,
    ProjectDevisEditionComponent,
    DevisPreviewComponent,
    DevisStatePipe,
    OneValueCardComponent
  ],
  providers: [
    ClientService,
    ProjectService,
    TaskService,
    NoteService,
    GainService,
    HistoryEntryService,
    NavigationService,
    DevisService
  ],
  exports: []
})
export class ProjectModule { }