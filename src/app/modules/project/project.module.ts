import { NgModule } from '@angular/core';
import { MyDatePickerModule } from 'mydatepicker';
import { DatepickerModule } from 'angular2-material-datepicker';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from 'app/modules/shared/shared.module';
import { MyManagerRoutingModule } from './project-routing.module';
import { NavigationService } from './services/navigation.service';
import { ProjectHomeComponent } from './components/project-home/project-home.component';
import { ProjectListComponent } from './components/common/project-list/project-list.component';
import { ProjectCreateComponent } from './components/common/project-create/project-create.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectTaskComponent } from './components/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from './components/project-detail/project-settings/project-settings.component';
import { NoteListComponent } from './components/common/note-list/note-list.component';
import { ProjectClientComponent } from './components/common/project-client/project-client.component';
import { ProjectHistoryComponent } from './components/common/project-history/project-history.component';
import { ProjectDashboardComponent } from './components/project-detail/project-dashboard/project-dashboard.component';
import { ProjectInvoiceComponent } from './components/project-detail/project-invoice/project-invoice.component';
import { ProjectDevisComponent } from './components/project-detail/project-devis/project-devis.component';
import { ProjectDevisEditionComponent } from './components/project-detail/project-devis/project-devis-edition/project-devis-edition.component';
import { DevisStatePipe } from './services/devisState.pipe';
import { DevisDashboardComponent } from './components/common/devis-dashboard/devis-dashboard.component';
import { OneValueCardComponent } from './components/common/one-value-card/one-value-card.component';
import { ProjectStateComponent } from './components/common/project-state/project-state.component';
import { ProjectNoteListComponent } from './components/common/project-note-list/project-note-list.component';
import { ProjectDevisListComponent } from './components/common/project-devis-list/project-devis-list.component';
import { KabanColumnComponent } from './components/common/task-kaban/kaban-column/kaban-column.component';
import { TaskKabanComponent } from './components/common/task-kaban/task-kaban.component';
import { DevisListItemComponent } from './components/common/devis-list-item/devis-list-item.component';
import { DevisPreviewComponent } from './components/common/devis-preview/devis-preview.component';
import { DevisLinePipe } from './services/devis-line.pipe';
import { InvoicePreviewComponent } from "./components/common/project/invoice/invoice-preview/invoice-preview.component";
import { ProjectInvoiceEditionComponent } from './components/project-detail/project-invoice/project-invoice-edition/project-invoice-edition.component';
import { SelectDevisComponent } from './components/project-detail/project-invoice/project-invoice-edition/select-devis/select-devis.component';
import { CreateNoteComponent } from './components/common/create-note/create-note.component';
import { ButtonInplaceComponent } from './components/common/button-inplace/button-inplace.component';
import { GainSummaryComponent } from './components/common/gain-summary/gain-summary.component';
import { ProjectMenuComponent } from './components/project-detail/project-menu/project-menu.component';
import { ProjectDetailResolver } from './services/project-resolver';
import { TaskEditionComponent } from './components/project-detail/project-task/task-edition/task-edition.component';

@NgModule({
  imports: [
    SharedModule,
    DragulaModule,
    MyDatePickerModule,
    DatepickerModule,
    MyManagerRoutingModule,
  ],
  declarations: [
    ProjectHomeComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectDetailComponent,
    ProjectTaskComponent,
    ProjectSettingsComponent,
    NoteListComponent,
    ProjectClientComponent,
    ProjectHistoryComponent,
    ProjectDashboardComponent,
    ProjectDevisComponent,
    ProjectInvoiceComponent,
    ProjectDevisEditionComponent,
    DevisDashboardComponent,
    DevisStatePipe,
    DevisLinePipe,
    OneValueCardComponent,
    ProjectStateComponent,
    ProjectNoteListComponent,
    ProjectDevisListComponent,
    TaskKabanComponent,
    KabanColumnComponent,
    DevisListItemComponent,
    DevisPreviewComponent,
    InvoicePreviewComponent,
    ProjectInvoiceEditionComponent,
    SelectDevisComponent,
    CreateNoteComponent,
    ButtonInplaceComponent,
    GainSummaryComponent,
    ProjectMenuComponent,
    TaskEditionComponent
  ],
  providers: [
    NavigationService,
    ProjectDetailResolver
  ],
  entryComponents: [
    SelectDevisComponent
  ],
  exports: []
})
export class ProjectModule { }
