import { NgModule } from '@angular/core';
import { ClientService } from 'app/my-manager/services/client.service';
import { ProjectService } from 'app/my-manager/services/project.service';
import { TaskService } from 'app/my-manager/services/task.service';
import { GainService } from 'app/my-manager/services/gain.service';
import { NoteService } from 'app/my-manager/services/note.service';
import { HistoryEntryService } from 'app/my-manager/services/history.service';
import { ProjectHomeComponent } from 'app/my-manager/components/project/project-home/project-home.component';
import { ProjectListComponent } from 'app/my-manager/components/project/common/project-list/project-list.component';
import { ProjectCreateComponent } from 'app/my-manager/components/project/common/project-create/project-create.component';
import { ProjectDetailComponent } from 'app/my-manager/components/project/project-detail/project-detail.component';
import { ProjectTaskComponent } from 'app/my-manager/components/project/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from 'app/my-manager/components/project/project-detail/project-settings/project-settings.component';
import { NoteListComponent } from 'app/my-manager/components/project/common/note-list/note-list.component';
import { ProjectGainsComponent } from 'app/my-manager/components/project/common/project-gains/project-gains.component';
import { ProjectClientComponent } from 'app/my-manager/components/project/common/project-client/project-client.component';
import { GainListComponent } from 'app/my-manager/components/project/common/gain-list/gain-list.component';
import { ProjectHistoryComponent } from 'app/my-manager/components/project/common/project-history/project-history.component';
import { MyManagerRoutingModule } from 'app/my-manager/my-manager-routing';
import { SharedModule } from 'app/modules/shared/shared.module';
import { DragulaModule } from 'ng2-dragula';
import { MyDatePickerModule } from 'mydatepicker';
import { DatepickerModule } from 'angular2-material-datepicker';
import { MyManagerComponent } from './my-manager.component';
import { NavigationService } from 'app/my-manager/services/navigation.service';
import { ProjectDashboardComponent } from 'app/my-manager/components/project/project-detail/project-dashboard/project-dashboard.component';
import { ProjectInvoiceComponent } from 'app/my-manager/components/project/project-detail/project-invoice/project-invoice.component';
import { ProjectDevisComponent } from 'app/my-manager/components/project/project-detail/project-devis/project-devis.component';
import { ProjectDevisEditionComponent } from 'app/my-manager/components/project/project-detail/project-devis/project-devis-edition/project-devis-edition.component';
import { DevisService } from 'app/my-manager/services/devis.service';
import { DevisStatePipe } from 'app/my-manager/components/common/devisState.pipe';
import { DevisPreviewComponent } from 'app/my-manager/components/project/common/devis-preview/devis-preview.component';
import { OneValueCardComponent } from 'app/my-manager/components/project/common/one-value-card/one-value-card.component';

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
    MyManagerComponent,
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
export class MyManagerModule { }