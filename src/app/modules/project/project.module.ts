import { SquareListComponent } from './components/common/square-list/square-list.component';
import { ClientModule } from './../client/client.module';
import { CreateDevisComponent } from './components/common/create-devis/create-devis.component';
import { ProjectTitleComponent } from './components/common/project-title/project-title.component';
import { NoteItemComponent } from './components/common/project-note-list/note-item/note-item.component';
import { ProjectStatePipe } from './services/projectState.pipe';
import { CreateProjectComponent } from './components/common/create-project/create-project.component';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from 'app/modules/shared/shared.module';
import { MyManagerRoutingModule } from './project-routing.module';
import { NavigationService } from './services/navigation.service';
import { ProjectHomeComponent } from './components/project-home/project-home.component';
import { ProjectListComponent } from './components/common/project-list/project-list.component';
import { ProjectCreateComponent } from './components/common/project-create/project-create.component';
import { ProjectTaskComponent } from './components/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from './components/project-detail/project-settings/project-settings.component';
import { ProjectClientComponent } from './components/common/project-client/project-client.component';
import { ProjectHistoryComponent } from './components/common/project-history/project-history.component';
import { ProjectDashboardComponent } from './components/project-detail/project-dashboard/project-dashboard.component';
import { ProjectInvoiceComponent } from './components/project-detail/project-invoice/project-invoice.component';
import { ProjectDevisComponent } from './components/project-detail/project-devis/project-devis.component';
import { ProjectDevisEditionComponent } from './components/project-detail/project-devis/project-devis-edition/project-devis-edition.component';
import { DevisStatePipe } from './services/devisState.pipe';
import { InvoiceStatePipe } from './services/invoiceState.pipe';
import { HistoryEnrtyPipe } from './services/history-entry.pipe';
import { ProjectStateComponent } from './components/common/project-state/project-state.component';
import { ProjectNoteListComponent } from './components/common/project-note-list/project-note-list.component';
import { DevisListComponent } from './components/common/devis-list/devis-list.component';
import { KabanColumnComponent } from './components/common/task-kaban/kaban-column/kaban-column.component';
import { TaskKabanComponent } from './components/common/task-kaban/task-kaban.component';
import { DevisListItemComponent } from './components/common/devis-list-item/devis-list-item.component';
import { DevisPreviewComponent } from './components/common/devis-preview/devis-preview.component';
import { DevisLinePipe } from './services/devis-line.pipe';
import { InvoicePreviewComponent } from './components/common/project/invoice/invoice-preview/invoice-preview.component';
import { ProjectInvoiceEditionComponent } from './components/project-detail/project-invoice/project-invoice-edition/project-invoice-edition.component';
import { SelectDevisComponent } from './components/project-detail/project-invoice/project-invoice-edition/select-devis/select-devis.component';
import { CreateNoteComponent } from './components/common/create-note/create-note.component';
import { ButtonInplaceComponent } from './components/common/button-inplace/button-inplace.component';
import { ProjectDetailResolver } from './services/project-resolver';
import { TaskEditionComponent } from './components/project-detail/project-task/task-edition/task-edition.component';
import { ProjectListItemComponent } from 'app/modules/project/components/common/project-list/project-list-item/project-list-item.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DevisGuard } from 'app/modules/project/components/guards/devis.guard';
import { CreateHistoryEntryDialogComponent } from 'app/modules/project/components/common/create-history-entry-dialog/create-history-entry-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    DragulaModule,
    MyManagerRoutingModule,
    ClientModule,
    NgxChartsModule
  ],
  declarations: [
    InvoiceStatePipe,
    DevisStatePipe,
    DevisLinePipe,
    ProjectStatePipe,
    HistoryEnrtyPipe,
    ProjectHomeComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectTaskComponent,
    ProjectSettingsComponent,
    ProjectClientComponent,
    ProjectHistoryComponent,
    ProjectDashboardComponent,
    ProjectDevisComponent,
    ProjectInvoiceComponent,
    ProjectDevisEditionComponent,
    ProjectStateComponent,
    ProjectNoteListComponent,
    DevisListComponent,
    TaskKabanComponent,
    KabanColumnComponent,
    DevisListItemComponent,
    DevisPreviewComponent,
    InvoicePreviewComponent,
    ProjectInvoiceEditionComponent,
    SelectDevisComponent,
    CreateNoteComponent,
    ButtonInplaceComponent,
    TaskEditionComponent,
    ProjectListItemComponent,
    CreateProjectComponent,
    NoteItemComponent,
    ProjectTitleComponent,
    CreateDevisComponent,
    SquareListComponent,
    CreateHistoryEntryDialogComponent
  ],
  providers: [
    NavigationService,
    ProjectDetailResolver,
    DevisGuard
  ],
  entryComponents: [
    SelectDevisComponent,
    CreateNoteComponent,
    CreateHistoryEntryDialogComponent
  ],
  exports: [
  ]
})
export class ProjectModule { }
