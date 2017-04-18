import { MyNotificationComponent } from './components/common/notification-center/my-notification/my-notification.component';
import { NotificationCenterComponent } from './components/common/notification-center/notification-center.component';
import { NotificationService, MyNotification } from './services/notification.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guards';
import { LoginComponent } from './components/authentication/login/login.component';
import { DropTargetDirective } from './components/common/drag-and-drop/drop-target.directive';
import { DraggableDirective } from './components/common/drag-and-drop/draggable.directive';
import { DragService } from './components/common/drag-and-drop/drag.service';
import { HistoryEntryService } from './services/history.service';
import { ProjectHistoryComponent } from './components/project/project-detail/project-history/project-history.component';
import { ClientCreateComponent } from './components/client/client-create/client-create.component';
import { NoteService } from './services/note.service';
import { DialogsService } from './services/dialog.service';
import { GainService } from './services/gain.service';
import { TaskService } from './services/task.service';
import { ProjectService } from './services/project.service';
import { ClientService } from './services/client.service';
import { KeysPipe } from './utils/keys.pipe';
import { ProjectClientComponent } from './components/project/project-detail/project-client/project-client.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { GainListComponent } from './components/project/gain-list/gain-list.component';
import { NoteListComponent } from './components/project/note-list/note-list.component';
import { ClientDetailComponent } from './components/client/client-detail/client-detail.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientComponent } from './components/client/home/client.component';
import { ProjectGainsComponent } from './components/project/project-detail/project-gains/project-gains.component';
import { ProjectSettingsComponent } from './components/project/project-detail/project-settings/project-settings.component';
import { ProjectTaskComponent } from './components/project/project-detail/project-task/project-task.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProjectHomeComponent } from './components/project/project-home/project-home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyDatePickerModule } from 'mydatepicker';
import { DatepickerModule } from 'angular2-material-datepicker';
import { ErrorService } from 'app/services/error.service';
import { EventsService } from 'app/services/event.service';
import { HomeComponent } from 'app/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    ConfirmDialogComponent,
    ProjectClientComponent,
    ClientCreateComponent,
    ProjectHistoryComponent,
    KeysPipe,
    DraggableDirective,
    DropTargetDirective,
    LoginComponent,
    NotificationCenterComponent,
    MyNotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    MyDatePickerModule,
    BrowserAnimationsModule,
    DatepickerModule,
    DragulaModule
  ],
  providers: [
    ClientService,
    ProjectService,
    TaskService,
    NoteService,
    GainService,
    DialogsService,
    HistoryEntryService,
    DragService,
    AuthGuard,
    UserService,
    AuthenticationService,
    NotificationService,
    ErrorService,
    EventsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [
    ConfirmDialogComponent
  ]
})
export class AppModule { }
