import { NoteService } from './services/note.service';
import { DialogsService } from './services/dialog.service';
import { GainService } from './services/gain.service';
import { TaskService } from './services/task.service';
import { ProjectService } from './services/project.service';
import { ClientService } from './services/client.service';
import { KeysPipe } from './utils/keys.pipe';
import { ProjectClientComponent } from './components/project/project-detail/project-client/project-client.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { GainListComponent } from './components/gain-list/gain-list.component';
import { NoteListComponent } from './components/note-list/note-list.component';
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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
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
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    MyDatePickerModule,
    BrowserAnimationsModule
  ],
  providers: [
    ClientService,
    ProjectService,
    TaskService,
    NoteService,
    GainService,
    DialogsService
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
