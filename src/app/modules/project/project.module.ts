import { NgModule } from '@angular/core';
import { MyDatePickerModule } from 'mydatepicker';
import { DatepickerModule } from 'angular2-material-datepicker';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from 'app/modules/shared/shared.module';
import { MyManagerRoutingModule } from './project-routing';
import { NavigationService } from './services/navigation.service';
import { ProjectHomeComponent } from './components/project-home/project-home.component';
import { ProjectListComponent } from './components/common/project-list/project-list.component';
import { ProjectCreateComponent } from './components/common/project-create/project-create.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectTaskComponent } from './components/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from './components/project-detail/project-settings/project-settings.component';
import { NoteListComponent } from './components/common/note-list/note-list.component';
import { ProjectClientComponent } from './components/common/project-client/project-client.component';
import { GainListComponent } from './components/common/gain-list/gain-list.component';
import { ProjectHistoryComponent } from './components/common/project-history/project-history.component';
import { ProjectDashboardComponent } from './components/project-detail/project-dashboard/project-dashboard.component';
import { ProjectInvoiceComponent } from './components/project-detail/project-invoice/project-invoice.component';
import { ProjectDevisComponent } from './components/project-detail/project-devis/project-devis.component';
import { ProjectDevisEditionComponent } from './components/project-detail/project-devis/project-devis-edition/project-devis-edition.component';
import { DevisStatePipe } from './services/devisState.pipe';
import { DevisPreviewComponent } from './components/common/devis-preview/devis-preview.component';
import { OneValueCardComponent } from './components/common/one-value-card/one-value-card.component';
import { ProjectStateComponent } from './components/common/project-state/project-state.component';
import { ProjectNoteListComponent } from './components/common/project-note-list/project-note-list.component';
import { ProjectDevisListComponent } from './components/common/project-devis-list/project-devis-list.component';
import { KabanColumnComponent } from './components/common/task-kaban/kaban-column/kaban-column.component';
import { TaskKabanComponent } from './components/common/task-kaban/task-kaban.component';

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
    OneValueCardComponent,
    ProjectStateComponent,
    ProjectNoteListComponent,
    ProjectDevisListComponent,
    TaskKabanComponent,
    KabanColumnComponent
  ],
  providers: [
    NavigationService
  ],
  exports: []
})
export class ProjectModule { }
