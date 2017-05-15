import { NgModule } from '@angular/core';
import { ClientService } from 'app/my-manager/services/client.service';
import { ProjectService } from 'app/my-manager/services/project.service';
import { TaskService } from 'app/my-manager/services/task.service';
import { GainService } from 'app/my-manager/services/gain.service';
import { NoteService } from 'app/my-manager/services/note.service';
import { HistoryEntryService } from 'app/my-manager/services/history.service';
import { HeaderComponent } from 'app/my-manager/components/common/header/header.component';
import { HomeComponent } from 'app/my-manager/components/home/home.component';
import { UserMenuComponent } from 'app/my-manager/components/common/header/user-menu/user-menu.component';
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
import { SharedModule } from 'app/shared/shared.module';
import { DragulaModule } from 'ng2-dragula';
import { MyDatePickerModule } from 'mydatepicker';
import { DatepickerModule } from 'angular2-material-datepicker';
import { MyManagerComponent } from './my-manager.component';
import { NavigationService } from 'app/my-manager/services/navigation.service';
import { FooterComponent } from 'app/my-manager/components/common/footer/footer.component';
import { ProjectDashboardComponent } from 'app/my-manager/components/project/project-detail/project-dashboard/project-dashboard.component';
import { ProjectInvoiceComponent } from 'app/my-manager/components/project/project-detail/project-invoice/project-invoice.component';
import { ProjectDevisComponent } from 'app/my-manager/components/project/project-detail/project-devis/project-devis.component';
import { ProjectDevisEditionComponent } from 'app/my-manager/components/project/project-detail/project-devis/project-devis-edition/project-devis-edition.component';
import { DevisService } from 'app/my-manager/services/devis.service';
import { DevisStatePipe } from 'app/my-manager/components/common/devisState.pipe';
import { UserProfilComponent } from 'app/my-manager/components/common/user-profil/user-profil.component';
import { UserProfilGeneralComponent } from 'app/my-manager/components/common/user-profil/children/user-profil-general/user-profil-general.component';
import { UserProfilPasswordComponent } from 'app/my-manager/components/common/user-profil/children/user-profil-password/user-profil-password.component';
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
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserMenuComponent,
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
    UserProfilComponent,
    UserProfilGeneralComponent,
    UserProfilPasswordComponent,
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
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class MyManagerModule { }