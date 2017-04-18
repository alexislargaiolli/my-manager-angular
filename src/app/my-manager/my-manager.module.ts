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
import { ProjectListComponent } from 'app/my-manager/components/project/project-list/project-list.component';
import { ProjectCreateComponent } from 'app/my-manager/components/project/project-create/project-create.component';
import { ProjectDetailComponent } from 'app/my-manager/components/project/project-detail/project-detail.component';
import { ProjectTaskComponent } from 'app/my-manager/components/project/project-detail/project-task/project-task.component';
import { ProjectSettingsComponent } from 'app/my-manager/components/project/project-detail/project-settings/project-settings.component';
import { NoteListComponent } from 'app/my-manager/components/project/note-list/note-list.component';
import { ClientDetailComponent } from 'app/my-manager/components/client/client-detail/client-detail.component';
import { ClientListComponent } from 'app/my-manager/components/client/client-list/client-list.component';
import { ClientComponent } from 'app/my-manager/components/client/home/client.component';
import { ProjectGainsComponent } from 'app/my-manager/components/project/project-detail/project-gains/project-gains.component';
import { ProjectClientComponent } from 'app/my-manager/components/project/project-detail/project-client/project-client.component';
import { GainListComponent } from 'app/my-manager/components/project/gain-list/gain-list.component';
import { ClientCreateComponent } from 'app/my-manager/components/client/client-create/client-create.component';
import { ProjectHistoryComponent } from 'app/my-manager/components/project/project-detail/project-history/project-history.component';
import { MyManagerRoutingModule } from 'app/my-manager/my-manager-routing';
import { SharedModule } from 'app/shared/shared.module';
import { DragulaModule } from 'ng2-dragula';
import { MyDatePickerModule } from 'mydatepicker';
import { DatepickerModule } from 'angular2-material-datepicker';
import { MyManagerComponent } from './my-manager.component';

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
    HomeComponent,
    UserMenuComponent,
    ProjectHomeComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectDetailComponent,
    ProjectTaskComponent,
    ProjectSettingsComponent,
    ProjectGainsComponent,
    ClientComponent,
    ClientListComponent,
    ClientDetailComponent,
    NoteListComponent,
    GainListComponent,
    ProjectClientComponent,
    ClientCreateComponent,
    ProjectHistoryComponent,
    MyManagerComponent
],
  providers: [
    ClientService,
    ProjectService,
    TaskService,
    NoteService,
    GainService,
    HistoryEntryService
  ],
  exports: [
    HeaderComponent
  ]
})
export class MyManagerModule { }